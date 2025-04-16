import { connectToDatabase } from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res
      .status(400)
      .json({ message: "Token and new password are required" });

  await connectToDatabase();

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully" });
}
