"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?redirect=/my-bookings");
      return;
    }
    async function fetchBookings() {
      setLoading(true);
      const res = await fetch("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError("Failed to fetch bookings");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setBookings(data.bookings);
      setLoading(false);
    }
    fetchBookings();
  }, [router]);

  const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800">
              <th className="p-2">Service</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Location</th>
              <th className="p-2">Total Cost</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.serviceName}</td>
                <td className="p-2">
                  {b.durationValue} {b.durationType}
                </td>
                <td className="p-2">
                  {b.location.division}, {b.location.district}, {b.location.city}, {b.location.area}, {b.location.address}
                </td>
                <td className="p-2">${b.totalCost}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">
                  {b.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
