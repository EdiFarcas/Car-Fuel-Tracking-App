"use client";

export default function DeleteCarButton({ carId }: { carId: string }) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this car? This will delete all fill-ups and mileage logs for this car.')) return;
    const res = await fetch(`/api/cars/${carId}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.href = '/dashboard';
    } else {
      alert('Failed to delete car.');
    }
  };
  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-red-800 hover:scale-[1.03] transition-all"
      >
        🗑️ Delete Car
      </button>
    </form>
  );
}
