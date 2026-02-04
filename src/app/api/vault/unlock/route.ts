import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { masterPassword } = await req.json();

    if (!masterPassword) {
      return NextResponse.json(
        { error: "Master password is required" },
        { status: 400 }
      );
    }

    // Get user with master password hash and salt
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        masterPassword: true,
        encryptionSalt: true,
      },
    });

    if (!user?.masterPassword || !user?.encryptionSalt) {
      return NextResponse.json(
        { error: "Vault not set up. Please complete registration." },
        { status: 400 }
      );
    }

    // Verify master password
    const isValid = await bcrypt.compare(masterPassword, user.masterPassword);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid master password" },
        { status: 401 }
      );
    }

    // Return the salt so the client can derive the encryption key
    return NextResponse.json({
      success: true,
      salt: user.encryptionSalt,
    });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
