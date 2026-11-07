import { connectDB } from "@/lib/mongodb";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

// REGISTER CONTROLLER : POST

export async function POST(req: NextRequest) {

    try {

        // Connect MongoDB
        await connectDB();

        // Get data from request body
        const { name, email, password } = await req.json();

        // Check empty fields
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    message: "Please fill all fields",
                    data: {}
                },
                { status: 400 }
            );
        }

        // Check existing user
        const existingUser = await users.findOne({ email });

        if (existingUser) {

            return NextResponse.json(
                {
                    message: "User already exists. Please login...",
                    data: {}
                },
                { status: 400 }
            );

        } else {

            // Encrypt password
            const encryptPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await users.create({
                name,
                email,
                password: encryptPassword
            });

            return NextResponse.json(
                {
                    message: "User registered successfully",
                    data: {
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email
                    }
                },
                { status: 201 }
            );

        }

    } catch (err) {

        console.log(err);

        return NextResponse.json(
            {
                message: "Something went wrong",
                data: {}
            },
            { status: 500 }
        );

    }

}