import { connectToDatabase } from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and code are required.",
          data: null,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user || !user.verifyCode || !user.verifyCodeExpires) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid email or code.",
          data: null,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (user.verifyCode !== code) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid reset code.",
          data: null,
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (user.verifyCodeExpires < Date.now()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Reset code has expired. Please request a new one.",
          data: null,
        }),
        { status: 410, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Reset code verified successfully.",
        data: null,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying reset code:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal Server Error.",
        data: null,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
