
import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { sendInvoiceEmail } from '../../../../lib/mailer';

export default async function handler(req, res) {
  // GET: List all bookings for user
  if (req.method === 'GET') {
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
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const db = client.db();
      const bookings = await db.collection('bookings').aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'service',
          },
        },
        { $unwind: '$service' },
        {
          $addFields: {
            serviceName: '$service.name',
          },
        },
        { $project: { service: 0 } },
        { $sort: { createdAt: -1 } },
      ]).toArray();
      return res.status(200).json({ bookings });
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    } finally {
      await client.close();
    }
  }
  // POST: Create booking
  if (req.method === 'POST') {
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
    const { serviceId, durationType, durationValue, location, totalCost } = req.body;
    if (!serviceId || !durationType || !durationValue || !location || !totalCost) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();
      const db = client.db();
      const booking = {
        userId: new ObjectId(userId),
        serviceId: new ObjectId(serviceId),
        durationType,
        durationValue,
        location,
        totalCost,
        status: 'Pending',
        createdAt: new Date(),
      };
      await db.collection('bookings').insertOne(booking);
      // Fetch user and service for email
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      const service = await db.collection('services').findOne({ _id: new ObjectId(serviceId) });
      // Send invoice email
      if (user && service) {
        const html = `
          <h2>Booking Invoice</h2>
          <p>Dear ${user.name},</p>
          <p>Thank you for booking <b>${service.name}</b>.</p>
          <ul>
            <li>Duration: ${durationValue} ${durationType}(s)</li>
            <li>Location: ${location.division}, ${location.district}, ${location.city}, ${location.area}, ${location.address}</li>
            <li>Total Cost: $${totalCost}</li>
            <li>Status: Pending</li>
          </ul>
          <p>We will contact you soon to confirm your booking.</p>
        `;
        sendInvoiceEmail({
          to: user.email,
          subject: `Booking Invoice - ${service.name}`,
          html,
        }).catch(() => {});
      }
      return res.status(201).json({ message: 'Booking created', booking });
    } catch (e) {
      return res.status(500).json({ message: 'Server error' });
    } finally {
      await client.close();
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
