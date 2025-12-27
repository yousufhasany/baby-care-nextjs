// Run this script with: node lib/listServices.js
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: __dirname + '/../.env' });

const uri = process.env.MONGODB_URI;

async function listServices() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const services = await db.collection('services').find({}).toArray();
    console.log('Services in database:');
    services.forEach(s => {
      console.log(`Name: ${s.name}, _id: ${s._id}`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

listServices();
