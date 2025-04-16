import { connectToDatabase } from "@/lib/db"; // Adjust the import path as necessary
import User from "@/models/user.model"; // Adjust the import path as necessary
import { Resend } from "resend"; // Make sure you import this way if using ES Modules

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "Email is required.",
          success: false,
          data: null,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "No user found with this email.",
          success: false,
          data: null,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expiry = Date.now() + 10 * 60 * 1000;

    user.verifyCode = resetCode;
    user.verifyCodeExpires = expiry;
    await user.save();

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Whisperly <noreply@talhabilal.dev>",
      to: email,
      subject: "Your Password Reset Code",
      html: `
        <p>Hello,</p>
        <p>Your password reset code is: <b>${resetCode}</b></p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });

    return new Response(
      JSON.stringify({
        message: "Reset code sent to your email.",
        success: true,
        data: null,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending reset code:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        success: false,
        data: null,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
