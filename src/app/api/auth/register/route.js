import dbConnect from "@/lib/database";
import User from "@/server/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(request) {
    await dbConnect();
    const { name, email, password } = await request.json();
    const user = await User.findOne({ email });
    if (user) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, passwordHash: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}