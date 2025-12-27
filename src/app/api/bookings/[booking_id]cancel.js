import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  // Auth check
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    userId = decoded.userId;
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const { booking_id } = req.query;
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(booking_id), userId: new ObjectId(userId) },
      { $set: { status: 'Cancelled' } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json({ message: 'Booking cancelled' });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  } finally {
    await client.close();
  }
}
