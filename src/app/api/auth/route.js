import { hash } from 'bcryptjs';
import { MongoClient } from 'mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { nid, name, email, contactNumber, password } = body;
    if (!nid || !name || !email || !contactNumber || !password) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      return Response.json({ message: 'Password does not meet requirements' }, { status: 400 });
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    const existing = await db.collection('users').findOne({ email });
    if (existing) {
      await client.close();
      return Response.json({ message: 'Email already registered' }, { status: 409 });
    }
    const passwordHash = await hash(password, 10);
    const user = {
      nid,
      name,
      email,
      contactNumber,
      passwordHash,
      provider: 'local',
      createdAt: new Date(),
    };
    await db.collection('users').insertOne(user);
    await client.close();
    return Response.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (e) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
