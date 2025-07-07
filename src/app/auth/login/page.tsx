'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="max-w-md mx-auto p-8 bg-[var(--muted)] rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-[var(--primary)]">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[var(--border)] px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button type="submit" className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
          Sign In
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </main>
  );
}
