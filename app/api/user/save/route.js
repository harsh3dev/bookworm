import prisma from '@/lib/utils/prisma';  // Assuming prisma instance is in /lib/prisma.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: { clerkId: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
