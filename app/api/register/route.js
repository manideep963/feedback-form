import User from "@/app/lib/models/User";
import connectDB from "@/app/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const POST = async (req) => {
     const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }
    const hashedpassword = await hash(password, 5);
    const user = new User({ name, email, password: hashedpassword, role });
    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
};