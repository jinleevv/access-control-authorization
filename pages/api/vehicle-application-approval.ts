import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body["status"] === "approved") {
      const application = await prisma.vehicleEntryApplicationForm.update({
        where: {
          id: req.body["id"],
        },
        data: {
          status: "Approved", // The new data you want to update
        },
      });
    } else {
      const application = await prisma.vehicleEntryApplicationForm.update({
        where: {
          id: req.body["id"],
        },
        data: {
          status: "Rejected", // The new data you want to update
        },
      });
    }

    res.status(200).json({ message: "Updated successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
