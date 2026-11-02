# Pinterest Clone

A Pinterest-inspired image-sharing app built with Next.js. Browse pins, sign in with Google, publish image pins, and view pins and profiles.

## Features

- Browse image pins on the home page.
- Sign in with Google.
- Upload images to Cloudinary and save pin details in Firebase Firestore.
- View pin details and user profiles.
- Responsive layout styled with Tailwind CSS.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Firebase Firestore
- NextAuth.js with Google OAuth
- Cloudinary image uploads
- Tailwind CSS 4

## Getting started

### Prerequisites

- Node.js and npm
- A Firebase project with Firestore enabled
- A Google OAuth client
- A Cloudinary account with an unsigned image upload preset

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root:

```dotenv
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

In your Google OAuth client settings, add this authorized redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

Configure the Firebase web app settings in `app/Shared/firebaseConfig.ts` for your own Firebase project. The app reads and writes pin documents in the `pinterest-post` collection and user documents in the `user` collection. Set up Firestore security rules for your application; Firebase client configuration is not a substitute for access control.

Keep OAuth secrets and other private credentials out of source control. The repository ignores `.env*` files; do not commit your `.env.local`.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

| Route | Description |
| --- | --- |
| `/` | Browse pins |
| `/pin-builder` | Create a pin (requires signing in) |
| `/pin/[pinId]` | View a pin |
| `/[userId]` | View a user's profile and pins |

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
