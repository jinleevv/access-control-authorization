import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

interface RequesterInfoType {
  firstName: string;
  lastName: string;
  email: string;
}

interface VisitorInfoType {
  firstName: string;
  lastName: string;
  email: string;
  visitLocation: string;
  dateOfBirth: Date;
  phoneNumber: string;
  company: string;
}

interface VisitInfoType {
  durationStart: Date;
  durationEnd: Date;
  purpose: string;
  visitPersonName: string;
  visitPersonEmail: string;
  visitPersonDepartment: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Extract data from the request body
      const data = req.body;

      const requesterInfo: RequesterInfoType = {
        firstName: data.requesterInfo.firstName,
        lastName: data.requesterInfo.lastName,
        email: data.requesterInfo.email,
      };

      const visitorInfo: VisitorInfoType = {
        firstName: data.visitorInfo.firstName,
        lastName: data.visitorInfo.lastName,
        email: data.visitorInfo.email,
        visitLocation: data.visitorInfo.visitLocation,
        dateOfBirth: data.visitorInfo.dateOfBirth,
        phoneNumber: data.visitorInfo.phoneNumber,
        company: data.visitorInfo.company,
      };

      const visitInfo: VisitInfoType = {
        durationStart: data.visitInfo.durationStart,
        durationEnd: data.visitInfo.durationEnd,
        purpose: data.visitInfo.purpose,
        visitPersonName: data.visitInfo.visitPersonName,
        visitPersonEmail: data.visitInfo.visitPersonEmail,
        visitPersonDepartment: data.visitInfo.visitPersonDepartment,
      };

      const response = await prisma.personnelEntryApplicationForm.create({
        data: {
          requesterFirstName: requesterInfo.firstName,
          requesterLastName: requesterInfo.lastName,
          requesterEmail: requesterInfo.email,

          visitorFirstName: visitorInfo.firstName,
          visitorLastName: visitorInfo.lastName,
          visitorEmail: visitorInfo.email,
          visitorVisitLocation: visitorInfo.visitLocation,
          visitorPhoneNumber: visitorInfo.phoneNumber,
          visitorCompany: visitorInfo.company,

          durationStart: visitInfo.durationStart,
          durationEnd: visitInfo.durationEnd,
          purposeOfVisit: visitInfo.purpose,
          visitPersonName: visitInfo.visitPersonName,
          visitPersonEmail: visitInfo.visitPersonEmail,
          visitPersonDepartment: visitInfo.visitPersonDepartment,

          precautionsAcknowledged: data.precautionsAcknowledged,
        },
      });

      res.status(200).json({ message: "successful", data: data });
    } catch (error) {
      console.error("Failed to create request form:", error);
      res.status(500).json({ error: "Failed to create request form" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
