import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { service_id } = req.query;
  if (!ObjectId.isValid(service_id)) {
    return res.status(404).json({ message: 'Service not found' });
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const service = await db.collection('services').findOne({ _id: new ObjectId(service_id) });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    return res.status(200).json(service);
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
}
