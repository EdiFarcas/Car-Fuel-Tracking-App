'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push('/auth/login');
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <main className="max-w-md mx-auto p-8 bg-[var(--muted)] rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-[var(--secondary)]">Register</h1>
      <form onSubmit={handleRegister} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
        />
        <button type="submit" className="w-full bg-[var(--secondary)] text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">
          Register
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </main>
  );
}
