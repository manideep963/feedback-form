import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import Feedback from "@/app/lib/models/Feedback";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async (req) => {
  try {
    await connectDB();
    const feedbacks = await Feedback.find({});
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.error();
  }
}

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session.user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const name = session.user.name || "Anonymous";
    const email = session.user.email || "no-reply@example.com"; // fallback if needed

    const { feedback } = await req.json();

    if (!feedback) {
      return NextResponse.json("All fields are required", { status: 400 });
    }

    await connectDB();

    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();

    return NextResponse.json("Feedback submitted successfully", { status: 201 });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json("Server error", { status: 500 });
  }
};

