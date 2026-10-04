"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";

const EVENT_TYPES = [
  "Afterparty",
  "Mixer",
  "Afterparty/Mixer",
  "Wedding",
  "Private Event",
  "Other",
] as const;

export default function InquiryForm() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Add your name, email, and a short note about the event.");
      return;
    }

    if (String(data.get("_honey") ?? "").trim()) {
      setSent(true);
      return;
    }

    setError("");
    setSending(true);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(SITE.email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            date: String(data.get("date") ?? ""),
            city: String(data.get("city") ?? ""),
            type: String(data.get("type") ?? ""),
            message,
            _subject: `Booking inquiry from ${name}`,
            _replyto: email,
            _captcha: "false",
            _template: "table",
          }),
        },
      );
      const result = (await response.json()) as { success?: string | boolean };

      if (!response.ok || result.success === false || result.success === "false") {
        setError("Couldn't send that inquiry. Try again in a moment.");
        return;
      }

      setSent(true);
    } catch {
      setError("Couldn't send that inquiry. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div>
        <p className="text-2xl font-semibold text-[#f4f2ee]">Inquiry sent.</p>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-400">
          Thanks, I got it. I&apos;ll get back to you soon.
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          You can also send a text to{" "}
          <a
            href={SITE.smsHref}
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            {SITE.phone}
          </a>
          , or message{" "}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            {SITE.instagramHandle}
          </a>{" "}
          on Instagram!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 [color-scheme:dark] sm:grid-cols-2"
    >
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <label className="block text-sm text-zinc-300">
        Name
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          onChange={() => setError("")}
          className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#0066ff]"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          onChange={() => setError("")}
          className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#0066ff]"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Event date
        <input
          name="date"
          type="date"
          className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors focus:border-[#0066ff]"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        City / venue
        <input
          name="city"
          placeholder="City, venue"
          className="mt-2 w-full rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#0066ff]"
        />
      </label>
      <label className="block text-sm text-zinc-300">
        Event type
        <select
          name="type"
          defaultValue="Afterparty"
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#0a0a0a] px-4 py-3 text-white outline-none transition-colors focus:border-[#0066ff]"
        >
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-zinc-300 sm:col-span-2">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about the event"
          onChange={() => setError("")}
          className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-[#0066ff]"
        />
      </label>
      {error ? (
        <p className="text-sm text-red-300 sm:col-span-2">{error}</p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-[#0066ff] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#3385ff] disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send inquiry"}
        </button>
        <p className="mt-4 text-sm text-zinc-500">
          You can also send a text to{" "}
          <a
            href={SITE.smsHref}
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            {SITE.phone}
          </a>
          , or message{" "}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            {SITE.instagramHandle}
          </a>{" "}
          on Instagram!
        </p>
      </div>
    </form>
  );
}
