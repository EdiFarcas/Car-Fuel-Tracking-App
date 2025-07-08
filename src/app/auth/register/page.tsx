'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <main className="w-full flex justify-center bg-[var(--background)] px-4 md:px-0 pt-10">
      <div className="w-full max-w-2xl flex flex-col items-center p-8 bg-[var(--muted)] rounded-2xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-[var(--secondary)]">Register</h1>
        <form onSubmit={handleRegister} className="w-full flex flex-col gap-6 items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-2xl text-lg border border-[var(--border)] px-6 py-4 rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50"
          />
          <div className="relative w-full max-w-2xl">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-lg border border-[var(--border)] px-6 py-4 rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-[var(--foreground)]/60 hover:text-[var(--secondary)] focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="w-full max-w-2xl bg-[var(--secondary)] text-white py-4 text-lg rounded-lg font-semibold shadow hover:bg-[var(--secondary)]/80 hover:scale-105 hover:shadow-lg transition-all duration-200">
            Register
          </button>
          {error && <p className="text-red-500 text-center w-full">{error}</p>}
        </form>
      </div>
    </main>
  );
}
