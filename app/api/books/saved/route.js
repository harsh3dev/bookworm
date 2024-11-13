import { NextResponse } from 'next/server';
import prisma from '@/lib/utils/prisma';

export async function POST(request) {
  try {
    const { userId, bookId } = await request.json();

    // Validate input
    if (!userId || !bookId) {
      return NextResponse.json({ error: 'userId and bookId are required' }, { status: 400 });
    }

    // Fetch the current user's favorite books
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { favoriteBooksId: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isFavorite = user.favoriteBooksId.includes(bookId);

    // Determine the updated favoriteBooksId array
    const updatedFavoriteBooksId = isFavorite
      ? user.favoriteBooksId.filter(id => id !== bookId) // Remove if it exists
      : [...user.favoriteBooksId, bookId];               // Add if it doesn't exist

    // Update the user's favoriteBooksId array in the database
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        favoriteBooksId: updatedFavoriteBooksId,
      },
    });

    return NextResponse.json({
      message: isFavorite
        ? 'Book removed from favorites successfully'
        : 'Book added to favorites successfully',
      favoriteBooksId: updatedFavoriteBooksId,
    });
  } catch (error) {
    console.error('Error updating favorite books:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
