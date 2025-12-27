import { NextResponse } from "next/server";
import { ObjectId, MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { sendInvoiceEmail } from "../../../lib/mailer";

export async function GET(request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = auth.split(" ")[1];
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    userId = decoded.userId;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const bookings = await db.collection("bookings").aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      { $addFields: { serviceName: "$service.name" } },
      { $project: { service: 0 } },
      { $sort: { createdAt: -1 } },
    ]).toArray();
    return NextResponse.json({ bookings });
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const token = auth.split(" ")[1];
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    userId = decoded.userId;
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const body = await request.json();
  const { serviceId, durationType, durationValue, location, totalCost } = body;
  if (!serviceId || !durationType || !durationValue || !location || !totalCost) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
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
      status: "Pending",
      createdAt: new Date(),
    };
    await db.collection("bookings").insertOne(booking);
    // Fetch user and service for email
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    const service = await db.collection("services").findOne({ _id: new ObjectId(serviceId) });
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
    return NextResponse.json({ message: "Booking created", booking }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
