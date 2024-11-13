import { NextResponse } from 'next/server';
import prisma from '@/lib/utils/prisma';
import Groq from 'groq-sdk';



const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const { bookId } = await req.json();  // Destructure bookId from request body

  // Validate that bookId is present
  if (!bookId) {
    return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
  }

  try {
    // Fetch the book details from the Prisma database
    const book = await prisma.book.findUnique({
      where: { id: bookId },  // Ensure bookId is passed here
    });

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    // Create the Groq chat completion request with the book details
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `You are generating a summary for a book's content. The book's full content is provided in HTML format.
          The summary should capture the main themes, characters, and overall essence of the book. The summary should be suitable for someone who wants a quick overview of the story and its key elements without reading the full text.

          ${book.content}.

          Please keep the summary between 100-150 words, focusing on the important aspects of the narrative.`
        },
      ],
      model: 'llama-3.2-90b-text-preview',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    // Access the completion text from Groq-SDK response
    const summary = chatCompletion.choices[0]?.message?.content || 'No summary generated';

    // Send back the summary as a response
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating summary with Groq-SDK:', error);
    return NextResponse.json({ message: 'Error generating summary' }, { status: 500 });
  }
}