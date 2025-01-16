import prisma from "@/lib/db"; // Your Prisma client
import { hash, compare } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, currentPassword, newPassword } = req.body;

  // Validate request body
  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Both current and new passwords are required." });
  }

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the current password
    const isMatch = await compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(403)
        .json({ message: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 14);

    // Update the user's password in the database
    await prisma.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
