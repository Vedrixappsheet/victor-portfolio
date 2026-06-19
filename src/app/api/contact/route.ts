import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";

export const runtime = "nodejs";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const project = String(body.project || "").trim();
  const stack = String(body.stack || "").trim();
  const message = String(body.message || "").trim();

  // Honeypot: real users leave this empty; bots fill it.
  if (String(body.company || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!message || message.length < 5) {
    return NextResponse.json({ error: "Please add a short message." }, { status: 400 });
  }

  // Save first so a lead is never lost even if email fails.
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("submissions").insert({
      name,
      email,
      project: project || null,
      stack: stack || null,
      message,
    });
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save your message. Please email me directly." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Save failed:", err);
    return NextResponse.json(
      { error: "Server not configured. Please email me directly." },
      { status: 500 }
    );
  }

  // Email is best-effort; don't fail the request if it doesn't send.
  await sendNotification({ name, email, project, stack, message });

  return NextResponse.json({ ok: true });
}
