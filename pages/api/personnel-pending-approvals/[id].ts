import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const givenID: string = id;

  const data = await prisma.personnelEntryApplicationForm.findUnique({
    where: {
      id: givenID,
    },
  });

  res.status(200).json(data);
}
