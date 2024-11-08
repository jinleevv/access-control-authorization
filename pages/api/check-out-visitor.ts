import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const application = await prisma.personnelEntryApplicationForm.update({
      where: {
        id: req.body["id"],
      },
      data: {
        checkOut: new Date(),
      },
    });

    return res.status(200).json({ application });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
