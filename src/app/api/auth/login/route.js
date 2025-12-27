import { compare } from 'bcryptjs';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      return Response.json({ message: 'Email and password required' }, { status: 400 });
    }
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      await client.close();
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const valid = await compare(password, user.passwordHash);
    if (!valid) {
      await client.close();
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    await client.close();
    return Response.json({ token, user: { name: user.name, email: user.email } }, { status: 200 });
  } catch (e) {
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
