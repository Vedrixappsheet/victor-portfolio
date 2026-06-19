import { getSupabaseAdmin, type Submission } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Simple shared-secret gate via ?key=... matched against ADMIN_KEY.
// For a real app, swap this for proper auth (Supabase Auth, Clerk, etc.).
export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || searchParams.key !== adminKey) {
    return (
      <main className="mx-auto max-w-[700px] px-7 py-32">
        <h1 className="mb-3 text-2xl font-bold">Admin</h1>
        <p className="text-muted">
          Access denied. Append <code className="text-acid">?key=YOUR_ADMIN_KEY</code> to the URL.
        </p>
      </main>
    );
  }

  let submissions: Submission[] = [];
  let loadError = "";
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) loadError = error.message;
    else submissions = (data as Submission[]) || [];
  } catch (err) {
    loadError = err instanceof Error ? err.message : "Failed to load.";
  }

  return (
    <main className="mx-auto max-w-[900px] px-7 py-20">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Submissions <span className="text-acid">({submissions.length})</span>
        </h1>
        <a href="/" className="font-mono text-sm text-muted hover:text-ink">← back to site</a>
      </div>

      {loadError && (
        <p className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4 font-mono text-sm text-red-300">
          {loadError}
        </p>
      )}

      {submissions.length === 0 && !loadError && (
        <p className="text-muted">No submissions yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {submissions.map((s) => (
          <div key={s.id} className="rounded-xl border border-line bg-panel p-6">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div className="font-semibold">{s.name}</div>
              <div className="font-mono text-xs text-muted">
                {new Date(s.created_at).toLocaleString()}
              </div>
            </div>
            <a href={`mailto:${s.email}`} className="font-mono text-sm text-acid">{s.email}</a>
            {(s.project || s.stack) && (
              <div className="mt-2 font-mono text-xs text-muted">
                {s.project && <span>Project: {s.project}　</span>}
                {s.stack && <span>Stack: {s.stack}</span>}
              </div>
            )}
            <p className="mt-3 whitespace-pre-wrap text-sm text-ink/90">{s.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
