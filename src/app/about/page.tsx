export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">About Car Fuel Tracker</h1>
      <p className="text-lg text-[var(--foreground)]/80 mb-4">Car Fuel Tracker is a modern web app designed to help you track your car’s fuel fill-ups, EV charging, mileage, and costs. Whether you drive a gasoline, diesel, LPG, hybrid, or electric vehicle, our app makes it easy to log, analyze, and optimize your driving habits.</p>
      <ul className="list-disc pl-6 text-[var(--foreground)]/80">
        <li>Multi-car and hybrid support</li>
        <li>Unit-aware UI for all fuel types</li>
        <li>Interactive stats and charts</li>
        <li>Private and secure data</li>
      </ul>
      <p className="mt-6 text-sm text-gray-500">Built with Next.js, Prisma, and Tailwind CSS.</p>
    </main>
  );
}
