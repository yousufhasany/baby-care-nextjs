// Run this script with: node lib/clearAndSeedServices.js
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: __dirname + '/../.env' });

const uri = process.env.MONGODB_URI;

const services = [
  {
    name: 'Baby Sitting Service',
    description: 'Trusted babysitters for your children, available by the hour or day.',
    pricePerHour: 10,
    pricePerDay: 60,
    image: '/file.svg',
    createdAt: new Date(),
  },
  {
    name: 'Elderly Care Service',
    description: 'Professional caregivers for elderly family members, with compassion and expertise.',
    pricePerHour: 12,
    pricePerDay: 70,
    image: '/file.svg',
    createdAt: new Date(),
  },
  {
    name: 'Sick / Special Care Service',
    description: 'Specialized care for sick or special needs family members, at home.',
    pricePerHour: 15,
    pricePerDay: 90,
    image: '/file.svg',
    createdAt: new Date(),
  },
];

async function clearAndSeed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    await db.collection('services').deleteMany({});
    const result = await db.collection('services').insertMany(services);
    console.log('Cleared and seeded services:', result.insertedIds);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

clearAndSeed();
