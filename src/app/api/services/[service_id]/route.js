import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/dbconnect";

export async function GET(request, context) {
  const { service_id } = await context.params;
  if (!ObjectId.isValid(service_id)) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const service = await db.collection("services").findOne({ _id: new ObjectId(service_id) });
    if (!service) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(service);
  } catch (e) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
