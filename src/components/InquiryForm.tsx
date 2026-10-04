"use client";

import { useState } from "react";
import { SITE } from "@/lib/data";

const EVENT_TYPES = [
  "Afterparty",
  "Competition",
  "Private event",
  "Other",
] as const;

export default function InquiryForm() {
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !message) {
      setError("Add your name and a short note about the event.");
      return;
    }

    setError("");
    const lines = [
      `Booking inquiry from ${name}`,
      data.get("date") ? `Date: ${data.get("date")}` : "",
      data.get("city") ? `City / venue: ${data.get("city")}` : "",
      data.get("type") ? `Event type: ${data.get("type")}` : "",
      message,
    ].filter(Boolean);

    window.location.href = `${SITE.smsHref}?body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 [color-scheme:dark] sm:grid-cols-2"
    >
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
          className="rounded-full bg-[#0066ff] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#3385ff]"
        >
          Send inquiry
        </button>
        <p className="mt-4 text-sm text-zinc-500">
          Sends a text to {SITE.phone}, or{" "}
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline-offset-4 hover:text-white hover:underline"
          >
            message {SITE.instagramHandle} on Instagram
          </a>
          .
        </p>
      </div>
    </form>
  );
}
