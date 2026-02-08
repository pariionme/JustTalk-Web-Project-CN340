'use server'

import { createSession, deleteSession } from '@/lib/session';

export async function signupAction(idToken: string) {
  try {
    await createSession(idToken);
    return { success: true };
  } catch (error) {
    console.error('Signup action error:', error);
    return { success: false, error: 'Failed to create session' };
  }
}

