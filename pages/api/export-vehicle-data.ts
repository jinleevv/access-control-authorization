import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const applications = await prisma.vehicleEntryApplicationForm.findMany({
      where: {
        createdAt: {
          gte: req.body["date_from"], // Greater than or equal to the start date
          lte: req.body["date_to"], // Less than or equal to the end date
        },
      },
    });

    return res.status(200).json({ applications });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
