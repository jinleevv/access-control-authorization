// pages/api/users.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const users = await prisma.user.delete({
        where: {
          email: req.body["email"],
          firstName: req.body["firstName"],
          lastName: req.body["lastName"],
          department: req.body["department"],
        },
      });

      res.status(200).json({ successful: true });
    } catch (error) {
      console.error("Error fetching users:", error);
      res
        .status(500)
        .json({ successful: false, error: "Failed to fetch users" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
