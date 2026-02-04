import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// Generate a random salt (16 bytes, base64 encoded)
function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

export async function POST(req: Request) {
  try {
    const { name, email, password, masterPassword } = await req.json();

    // Validate input
    if (!name || !email || !password || !masterPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedMasterPassword = await bcrypt.hash(masterPassword, 12);

    // Generate encryption salt (this will be used to derive the encryption key)
    const encryptionSalt = generateSalt();

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        masterPassword: hashedMasterPassword,
        encryptionSalt,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId: user.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
