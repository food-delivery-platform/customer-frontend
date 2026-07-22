import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const TOKEN_REFRESH_MARGIN_SECONDS = 60;

export type AuthTokenError = "MissingGoogleRefreshToken" | "GoogleTokenRefreshFailed";

type GoogleTokenResponse = {
  id_token?: string;
  refresh_token?: string;
};

function getGoogleIdTokenExpiresAt(idToken?: string) {
  if (!idToken) {
    return undefined;
  }

  const [, payload] = idToken.split(".");

  if (!payload) {
    return undefined;
  }

  try {
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(
      Buffer.from(normalizedPayload, "base64").toString("utf8"),
    ) as unknown;

    if (
      typeof decodedPayload === "object" &&
      decodedPayload !== null &&
      "exp" in decodedPayload &&
      typeof decodedPayload.exp === "number"
    ) {
      return decodedPayload.exp;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function isGoogleIdTokenValid(expiresAt?: number) {
  if (!expiresAt) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);

  return expiresAt - TOKEN_REFRESH_MARGIN_SECONDS > now;
}

async function refreshGoogleIdToken(refreshToken: string): Promise<GoogleTokenResponse> {
  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth credentials are not configured");
  }

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Google token refresh failed");
  }

  return response.json() as Promise<GoogleTokenResponse>;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "openid email profile",
        },
      },
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        token.googleIdToken = account.id_token;
        token.googleRefreshToken = account.refresh_token ?? token.googleRefreshToken;
        token.googleIdTokenExpiresAt = getGoogleIdTokenExpiresAt(account.id_token);
        token.authError = undefined;
      }

      if (isGoogleIdTokenValid(token.googleIdTokenExpiresAt)) {
        return token;
      }

      if (token.authError === "GoogleTokenRefreshFailed") {
        return token;
      }

      if (!token.googleRefreshToken) {
        token.authError = "MissingGoogleRefreshToken";

        return token;
      }

      try {
        const refreshedToken = await refreshGoogleIdToken(token.googleRefreshToken);

        if (!refreshedToken.id_token) {
          token.authError = "GoogleTokenRefreshFailed";

          return token;
        }

        token.googleIdToken = refreshedToken.id_token;
        token.googleRefreshToken = refreshedToken.refresh_token ?? token.googleRefreshToken;
        token.googleIdTokenExpiresAt = getGoogleIdTokenExpiresAt(refreshedToken.id_token);
        token.authError = undefined;
      } catch {
        token.authError = "GoogleTokenRefreshFailed";
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        authError: token.authError,
        googleIdToken: token.googleIdToken,
        customerId: token.sub,
      };
    },
  },
});
