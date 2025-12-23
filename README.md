# Ferrari Tour Travel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Landing Page CMS (Supabase)

Landing page (homepage) content can be controlled from the admin dashboard and stored in Supabase.

### 1) Create the table in Supabase

- Run the SQL in [supabase/schema.sql](supabase/schema.sql) on Supabase SQL Editor.

### 2) Set environment variables

- Copy `.env.example` → `.env.local` and fill:

  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 3) Edit content from admin

- Start dev server: `npm run dev`
- Open: `http://localhost:3000/admin/konten`
- Edit JSON and click **Simpan**

Notes:

- Content is stored in `site_pages` with `slug = "home"`.
- The homepage merges DB content with defaults, so when you add new fields later, older JSON rows won’t break.

## Admin Login (Supabase Auth)

There is **no hardcoded default password** in this project.

To access `/admin`, you must:

1) Create a user in Supabase Dashboard → **Authentication** → **Users** (set email + password)
2) Add that user to `public.admin_users` (admin allowlist)

Example SQL (replace with your user UUID):

```sql
insert into public.admin_users (user_id)
values ('00000000-0000-0000-0000-000000000000');
```

After that:

- Open `/login`, login with the Supabase email/password
- Click **Lanjut ke Admin** (no auto-redirect by design)

## Database Changes (per feature)

- Keep [supabase/schema.sql](supabase/schema.sql) as the latest consolidated schema.
- For every new DB change, also add a migration SQL file under `supabase/migrations/` (e.g. `YYYYMMDD_feature.sql`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
