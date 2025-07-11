export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8 bg-[var(--muted)] rounded-xl shadow">
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">Privacy Policy</h1>
      <p className="text-lg text-[var(--foreground)]/80 mb-4">Your privacy is important to us. Car Fuel Tracker is committed to protecting your personal data and ensuring your information is secure.</p>
      <ul className="list-disc pl-6 text-[var(--foreground)]/80">
        <li>We do not share your data with third parties.</li>
        <li>Your information is encrypted and stored securely.</li>
        <li>You can request deletion of your account and data at any time.</li>
      </ul>
      <p className="mt-6 text-sm text-gray-500">For questions about privacy, contact us via the Contact page.</p>
    </main>
  );
}
