import { createClient } from "@supabase/supabase-js";

// Server-only client. Uses the service-role key, so this module must never be
// imported into client components.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export type Submission = {
  id: string;
  name: string;
  email: string;
  project: string | null;
  stack: string | null;
  message: string;
  created_at: string;
};
