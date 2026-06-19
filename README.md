# victor — portfolio (Next.js)

Full-stack portfolio: Next.js 14 (App Router) + Tailwind, with a contact form that
**saves to Supabase Postgres** and **emails you** on every submission, plus a private
`/admin` page to read submissions.

## Stack

- **Frontend:** Next.js 14 App Router, React 18, Tailwind CSS, TypeScript
- **Backend:** Next.js Route Handler (`/api/contact`) — server-side, validates + saves + emails
- **Database:** Supabase Postgres (`submissions` table)
- **Email:** Resend (optional — submissions save even if email isn't set up)

## Routes

| Route          | What it is                                              |
| -------------- | ------------------------------------------------------- |
| `/`            | The portfolio (hero, services, projects, contact form)  |
| `/api/contact` | POST endpoint: validates, saves to Supabase, emails you |
| `/admin?key=…` | Submissions viewer, gated by `ADMIN_KEY`                |

## Setup (5 steps)

### 1. Install

```bash
npm install
```

### 2. Create the Supabase table

In your Supabase project: **SQL Editor → New query**, paste the contents of
[`supabase/schema.sql`](./supabase/schema.sql), and run it.

### 3. Configure environment

```bash
cp .env.example .env.local
```

Then fill in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` —
  Supabase **Project Settings → API**.
- `RESEND_API_KEY` — from [resend.com](https://resend.com) (optional).
  Leave `CONTACT_FROM_EMAIL=onboarding@resend.dev` until you verify your own domain.
- `ADMIN_KEY` — any long random string. You'll visit `/admin?key=THAT_VALUE`.

### 4. Run

```bash
npm run dev
# http://localhost:3000
```

### 5. Deploy (Vercel)

1. Push this folder to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the same env vars from `.env.local` in **Project → Settings → Environment Variables**.
4. Deploy.

## How the contact flow works

1. The form (`ContactForm.tsx`, a client component) POSTs JSON to `/api/contact`.
2. The route handler validates input, rejects bots via a hidden honeypot field,
   then **inserts into Supabase first** (so a lead is never lost), and **then**
   sends you an email. Email is best-effort: if Resend isn't configured or fails,
   the submission is still saved and the user still sees success.
3. You read submissions at `/admin?key=YOUR_ADMIN_KEY`.

## Security notes

- The service-role key is only ever used server-side (`src/lib/supabase.ts`,
  `/api/contact`, `/admin`). It is never exposed to the browser.
- `submissions` has Row Level Security enabled with no public policies, so it's
  unreadable by anonymous clients — only the server (service role) can touch it.
- `/admin` uses a simple shared-secret query param. For production, consider
  swapping in real auth (Supabase Auth, Clerk, etc.).

## Editing content

- **Services & projects:** `src/lib/data.ts`
- **Links (Fiverr, GitHub, email):** also `src/lib/data.ts`
- **Colors & fonts:** `tailwind.config.ts`
