import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { email, password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error: "Email and Password are required"},
                {status: 400}
            )
        }
        await connectToDatabase();
        const foundUser = await User.findOne({email})
        if(!foundUser){
            return NextResponse.json(
                {error: "No user exist with this email address. Please signUp first."},
                {status: 400}
            )
        }
        return NextResponse.json(
                {
                    message: "User Login successfully",
                    user: foundUser
                },
                {status: 200}
            )
    } catch (error) {
        console.error("User registeration error: ", error)
        return NextResponse.json(
                {error: "Failed to register."},
                {status: 400}
            )
    }
}