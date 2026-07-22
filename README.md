# Customer Frontend

Customer-facing food delivery frontend built with Next.js, TypeScript, and the App Router.

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app locally.

## Deployment

Configure these environment variables in Vercel for the deployed environment:

```bash
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_GATEWAY_URL=
```

`AUTH_SECRET` must be a cryptographically secure random value of at least 32 characters.

The production deployment workflow syncs those values from GitHub Secrets into
Vercel before building. Add these GitHub repository secrets:

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_API_GATEWAY_URL=
```

In Google Cloud Console, add the deployed Auth.js callback URL to the OAuth client's
authorized redirect URIs:

```text
https://<your-vercel-domain>/api/auth/callback/google
```

Google requires this redirect URI to exactly match the deployed URL, including the
scheme, host, path, and trailing slash behavior. Localhost working only confirms the
localhost redirect URI is configured.
