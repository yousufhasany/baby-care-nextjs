"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage({ params }) {
  const [service, setService] = useState(null);
  const [durationType, setDurationType] = useState("hour");
  const [durationValue, setDurationValue] = useState(1);
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch service details
  useEffect(() => {
    async function fetchService() {
      setLoading(true);
      console.log('BookingPage fetch for service_id:', params.service_id);
      const res = await fetch(`/api/services/${params.service_id}`);
      if (!res.ok) {
        setError("Service not found");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setService(data);
      setLoading(false);
    }
    fetchService();
  }, [params.service_id]);

  // Calculate cost
  useEffect(() => {
    if (!service) return;
    const price = durationType === "hour" ? service.pricePerHour : service.pricePerDay;
    setCost(price * durationValue);
  }, [service, durationType, durationValue]);

  // TODO: Fetch location data from Zapshift API

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Check authentication (token in localStorage for demo)
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login?redirect=/booking/" + params.service_id);
      return;
    }
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: params.service_id,
          durationType,
          durationValue,
          location,
          totalCost: cost,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");
      router.push("/my-bookings");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Book: {service.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <select
            value={durationType}
            onChange={(e) => setDurationType(e.target.value)}
            className="border p-2 rounded mr-2"
          >
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
          </select>
          <input
            type="number"
            min={1}
            value={durationValue}
            onChange={(e) => setDurationValue(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="division"
            placeholder="Division"
            className="border p-2 rounded w-full mb-2"
            value={location.division}
            onChange={handleChange}
            required
          />
          <input
            name="district"
            placeholder="District"
            className="border p-2 rounded w-full mb-2"
            value={location.district}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            className="border p-2 rounded w-full mb-2"
            value={location.city}
            onChange={handleChange}
            required
          />
          <input
            name="area"
            placeholder="Area"
            className="border p-2 rounded w-full mb-2"
            value={location.area}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Address"
            className="border p-2 rounded w-full"
            value={location.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span className="font-semibold">Total Cost: </span>
          <span>${cost}</span>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}
