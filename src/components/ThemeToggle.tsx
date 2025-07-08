"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // On mount, check localStorage or system preference
    const stored = localStorage.getItem('theme');
    if (stored) setTheme(stored);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    else setTheme('light');
  }, []);

  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.classList.remove('dark');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Light mode"
        className={`px-4 py-2 rounded-lg border border-[var(--primary)] shadow-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
          ${theme === 'light' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'}`}
        onClick={() => setTheme('light')}
      >🌞</button>
      <button
        aria-label="Dark mode"
        className={`px-4 py-2 rounded-lg border border-[var(--primary)] shadow-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]
          ${theme === 'dark' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'}`}
        onClick={() => setTheme('dark')}
      >🌚</button>
    </div>
  );
}
