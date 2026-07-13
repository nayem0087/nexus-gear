import { createAuthClient } from "better-auth/react";

/**
 * No baseURL needed here since the app and the auth API
 * live on the same origin (localhost:3000 in dev).
 * If you ever split them onto different domains, use a
 * NEXT_PUBLIC_-prefixed env var instead — plain
 * process.env.BETTER_AUTH_URL is NOT available in the browser.
 */
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;