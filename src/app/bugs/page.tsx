"use client";
import { useState } from "react";

export default function BugReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", bug: "" });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Submission failed.");
        return;
      }
      setSubmitted(true);
      setForm({ name: "", email: "", bug: "" });
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  }

  return (
    <main className="max-w-xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Report a Bug</h1>
      <p className="text-lg text-[var(--foreground)]/80 mb-4">Found a bug or issue? Please let us know so we can fix it quickly!</p>
      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg font-semibold text-center">Thank you for your bug report! We appreciate your help in improving Car Fuel Tracker.</div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name (optional)" className="w-full border border-[var(--border)] px-4 py-2 rounded-lg" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email (optional)" className="w-full border border-[var(--border)] px-4 py-2 rounded-lg" />
          <textarea name="bug" value={form.bug} onChange={handleChange} placeholder="Describe the bug or issue..." className="w-full border border-[var(--border)] px-4 py-2 rounded-lg min-h-[120px]" />
          <button type="submit" className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition">Submit Bug</button>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        </form>
      )}
      <p className="mt-6 text-sm text-gray-500">Thank you for helping us improve Car Fuel Tracker!</p>
    </main>
  );
}
