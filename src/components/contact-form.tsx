"use client";
import { useState } from "react";
import { services } from "@/data/content";
export function ContactForm() {
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("loading");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Unable to send. Please try again later.",
        );
      setState("success");
      setMessage("Your message was sent. Thank you for reaching out.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send. Please try again later.",
      );
    }
  }
  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="How should I call you?"
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@business.com"
          />
        </label>
      </div>
      <label>
        Service you’re interested in
        <select name="service" required defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map(([s]) => (
            <option key={s}>{s}</option>
          ))}
          <option>Something else / Let’s discuss</option>
        </select>
      </label>
      <label>
        Tell me about your project
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          placeholder="Your ideas, goals, timeline — I’d love to hear them."
        />
      </label>
      <p className="form-note">
        Email delivery is awaiting configuration. The form will clearly report
        if your message cannot be sent.
      </p>
      <button className="button" disabled={state === "loading"} type="submit">
        {state === "loading" ? "Sending…" : "Send your inquiry ↗"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={state === "error" ? "error" : ""}
      >
        {message}
      </p>
    </form>
  );
}
