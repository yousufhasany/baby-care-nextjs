
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative text-white py-20 px-4 text-center"
        style={{
          background: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Baby Care House</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto drop-shadow">
          Trusted, secure, and accessible caregiving services for your loved ones.
        </p>
        <Link href="/service/695025be236a550974f5e5f1" className="bg-white text-green-600 px-6 py-3 rounded font-semibold hover:bg-green-100 transition shadow">Book Now</Link>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300">
          We simplify caregiving by making care services easy to find and book, ensuring secure authentication, transparent pricing, and allowing you to manage and track bookings with ease.
        </p>
      </section>

      {/* Services Overview */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Baby Sitting Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-zinc-100 dark:border-zinc-800">
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" alt="Baby Sitting" className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mt-2 mb-2">Baby Sitting</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-300">Professional and loving care for children of all ages.</p>
            <Link href="/service/695025be236a550974f5e5f1" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">View Details</Link>
          </div>
          {/* Elderly Care Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-zinc-100 dark:border-zinc-800">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Elderly Care" className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mt-2 mb-2">Elderly Care</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-300">Compassionate support for seniors and elderly family members.</p>
            <Link href="/service/695025be236a550974f5e5f2" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">View Details</Link>
          </div>
          {/* Sick / Special Care Card */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg text-center transition-transform hover:-translate-y-2 hover:shadow-2xl border border-zinc-100 dark:border-zinc-800">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Sick / Special Care" className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="text-xl font-semibold mt-2 mb-2">Sick / Special Care</h3>
            <p className="mb-4 text-zinc-600 dark:text-zinc-300">Specialized care for the sick, disabled, or those with special needs.</p>
            <Link href="/service/695025be236a550974f5e5f3" className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">View Details</Link>
          </div>
        </div>
      </section>

      {/* Testimonials / Success Metrics */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow">
            <p className="italic mb-2">“Care.xyz made it so easy to find a trusted babysitter for my daughter. Highly recommended!”</p>
            <span className="font-semibold">— Sarah, Dhaka</span>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded shadow">
            <p className="italic mb-2">“The elderly care service is professional and compassionate. My parents are in good hands.”</p>
            <span className="font-semibold">— Ahmed, Chittagong</span>
          </div>
        </div>
      </section>
    </div>
  );
}
