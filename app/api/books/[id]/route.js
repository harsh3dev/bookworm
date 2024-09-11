// app/api/books/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split('/')[3]; // Extract ID from URL

  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) }
    });
    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching book details' }, { status: 500 });
  }
}
