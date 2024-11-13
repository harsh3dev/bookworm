'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function SaveUserOnLogin() {
  const { userId, isSignedIn } = useAuth();

  useEffect(() => {
    const saveUser = async () => {
      if (isSignedIn && userId) {
        await fetch('/api/user/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });
      }
    };

    saveUser();
  }, [isSignedIn, userId]);

  return null;
}
