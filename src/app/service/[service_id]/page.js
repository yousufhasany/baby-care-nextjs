
import { MongoClient, ObjectId } from 'mongodb';
import Link from 'next/link';


export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  if (!ObjectId.isValid(awaitedParams.service_id)) {
    return {};
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  let service = null;
  try {
    await client.connect();
    const db = client.db();
    service = await db.collection('services').findOne({ _id: new ObjectId(awaitedParams.service_id) });
  } finally {
    await client.close();
  }
  if (!service) return {};
  return {
    title: `${service.name} | Care.xyz Service Detail`,
    description: service.description,
    openGraph: {
      title: `${service.name} | Care.xyz Service Detail`,
      description: service.description,
      url: `https://care.xyz/service/${awaitedParams.service_id}`,
      siteName: 'Care.xyz',
      images: [
        {
          url: service.image || '/file.svg',
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
  };
}

async function getService(service_id) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    if (!ObjectId.isValid(service_id)) {
      return null;
    }
    const service = await db.collection('services').findOne({ _id: new ObjectId(service_id) });
    return service;
  } finally {
    await client.close();
  }
}

export default async function ServiceDetailPage({ params }) {
  const awaitedParams = await params;
  const service = await getService(awaitedParams.service_id);
  console.log('ServiceDetailPage awaitedParams.service_id:', awaitedParams.service_id);
  console.log('ServiceDetailPage fetched service:', service);
  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <Link href="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }
  console.log('Book Now button service._id:', service._id);
  // Choose a real image based on the service name
  let imageUrl = "/file.svg";
  if (service.name.toLowerCase().includes("baby")) {
    imageUrl = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80";
  } else if (service.name.toLowerCase().includes("elderly")) {
    imageUrl = "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80";
  } else if (service.name.toLowerCase().includes("sick")) {
    imageUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
  }
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <img src={imageUrl} alt={service.name} className="mb-4 w-full h-64 object-cover rounded-xl shadow" />
      <p className="mb-4 text-lg">{service.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Price per hour:</span> ${service.pricePerHour} <br />
        <span className="font-semibold">Price per day:</span> ${service.pricePerDay}
      </div>
      <Link
        href={`/booking/${service._id}`}
        className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
      >
        Book Service
      </Link>
    </div>
  );
}
