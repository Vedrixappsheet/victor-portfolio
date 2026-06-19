"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    stack: "",
    message: "",
    company: "", // honeypot
  });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and a short message are required.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong.");
        return;
      }
      setStatus("sent");
      setForm({ name: "", email: "", project: "", stack: "", message: "", company: "" });
    } catch {
      setStatus("error");
      setError("Network error. Please email me directly.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-line bg-[#16161c] p-8 text-center">
        <div className="mb-2 font-mono text-acid">✓ Message sent</div>
        <p className="text-muted">
          Thanks — I&apos;ll get back to you shortly. For anything urgent, email{" "}
          <a className="text-ink underline" href="mailto:victorv3925@gmail.com">
            victorv3925@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-mono text-sm text-muted hover:text-ink"
        >
          Send another →
        </button>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-line bg-[#16161c] px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-acid focus:outline-none transition-colors";

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          className={input}
          placeholder="Your name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <input
          className={input}
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          className={input}
          placeholder="Project type (optional)"
          value={form.project}
          onChange={(e) => update("project", e.target.value)}
        />
        <input
          className={input}
          placeholder="Platform / stack (optional)"
          value={form.stack}
          onChange={(e) => update("stack", e.target.value)}
        />
      </div>
      <textarea
        className={`${input} min-h-[120px] resize-y`}
        placeholder="Where is your project stuck?"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />
      {/* Honeypot — hidden from real users */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
      />
      {error && <p className="font-mono text-sm text-red-400">{error}</p>}
      <button
        onClick={submit}
        disabled={status === "sending"}
        className="mt-1 rounded-lg bg-acid px-6 py-3.5 font-mono text-sm font-bold text-bg transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </div>
  );
}
