"use client";

import { useState, FormEvent } from "react";
import { Profile } from "@/lib/types";
import Section from "./Section";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = "idle" | "sending" | "ok" | "error";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? "Something went wrong. Please try again.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Couldn't reach the server. Is the FastAPI backend running?"
      );
    }
  }

  return (
    <Section id="contact" yamlKey="contact" title="Get in touch">
      <div className="grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Have a project, role, or collaboration in mind? Send a message and
            I&apos;ll reply by email.
          </p>
          <dl className="mt-6 space-y-2 font-mono text-xs text-muted">
            <div className="flex gap-2">
              <dt className="text-teal-soft">email:</dt>
              <dd>{profile.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-teal-soft">phone:</dt>
              <dd>{profile.phone}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-teal-soft">location:</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl><div className="mt-6 flex flex-wrap gap-4 font-mono text-xs">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-soft underline">
                linkedin →
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-teal-soft underline">
                github →
              </a>
              <a href={profile.links.booking} target="_blank" rel="noopener noreferrer" className="text-teal-soft underline">
                book a call →
              </a>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-mono text-xs text-muted">
              name
            </label>
            <input
              id="name"
              name="name"
              required
              className="focus-ring w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block font-mono text-xs text-muted">
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="focus-ring w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-mono text-xs text-muted">
              message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="focus-ring w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-fg outline-none placeholder:text-muted/50"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="focus-ring rounded-md bg-amber px-5 py-2.5 font-mono text-xs font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "sending" ? "sending…" : "send message →"}
          </button>

          {status === "ok" && (
            <p className="font-mono text-xs text-teal-soft">
              Message sent — thank you! I&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-[#E8846A]">{errorMsg}</p>
          )}
        </form>
      </div>
    </Section>
  );
}
