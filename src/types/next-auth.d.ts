import "next-auth";
import "next-auth/jwt";
import type { AuthTokenError } from "@/auth";

declare module "next-auth" {
  interface Session {
    authError?: AuthTokenError;
    googleIdToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authError?: AuthTokenError;
    googleIdToken?: string;
    googleIdTokenExpiresAt?: number;
    googleRefreshToken?: string;
  }
}
