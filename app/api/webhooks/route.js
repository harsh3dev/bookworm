import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/utils/prisma';

export async function POST(req) {
  // Retrieve WEBHOOK_SECRET from environment
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get headers from the request
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Verify that all headers are present
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers:', { svix_id, svix_timestamp, svix_signature });
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  // Retrieve the payload from the request
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;
  try {
    // Initialize Webhook instance with the secret
    const wh = new Webhook(WEBHOOK_SECRET);

    // Verify the signature using Svix headers
    evt = await wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred during verification', { status: 400 });
  }

  // Process the verified event
  const eventType = evt.type;
  try {
    const { id: userId, email_addresses, first_name, last_name } = evt.data;
    console.log(`Webhook with ID ${userId} and type ${eventType}`);
    console.log('Webhook body:', body);
/*
    id       Int    @id @default(autoincrement())
    userId   String @unique
    name     String
    email    String   @unique
    image         String?
    favoriteBooksId String[] @default([])
    password String
*/
    // Handle user creation and update events
    if (eventType === 'user.created') {
      await prisma.user.create({
        data: {
          userId: userId,
          email: email_addresses[0]?.email_address,
          name: `${first_name} ${last_name}`,
          password: '', // Temporary password
        },
      });
      console.log(`User ${userId} created and added to the database.`);
    } else if (eventType === 'user.updated') {
      await prisma.user.update({
        where: { userId: userId },
        data: {
          email: email_addresses[0]?.email_address,
          name: `${first_name} ${last_name}`,
        },
      });
      console.log(`User ${userId} updated in the database.`);
    }
  } catch (error) {
    console.error('Database operation failed:', error);
    return new Response('Database operation failed', { status: 500 });
  }

  return new Response('', { status: 200 });
}