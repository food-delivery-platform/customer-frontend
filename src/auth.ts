import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
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
    jwt({ token, account }) {
      if (account?.provider === "google") {
        token.googleIdToken = account.id_token;
      }

      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        googleIdToken: token.googleIdToken,
      };
    },
  },
});
