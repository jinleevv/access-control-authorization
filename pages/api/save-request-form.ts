import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

interface RequesterInfoType {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  company: string;
}

interface VisitorInfoType {
  fullName: string;
  email: string;
  visitLocation: string;
  vehicleUsage: boolean;
  dateOfBirth: Date;
  nationality: string;
  phoneNumber: string;
  company: string;
  position: string;
  vehicalProvince: string;
  vehicalNumber: string;
  vehicalType: string;
  vehicalModel: string;
}

interface VisitInfoType {
  durationStart: Date;
  durationEnd: Date;
  purpose: string;
  visitPersonName: string;
  visitPersonEmail: string;
  visitPersonPhoneNumber: string;
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
        dateOfBirth: data.requesterInfo.dateOfBirth,
        phoneNumber: data.requesterInfo.phoneNumber,
        company: data.requesterInfo.company,
      };

      const visitorInfo: VisitorInfoType = {
        fullName: data.visitorInfo.fullName,
        email: data.visitorInfo.email,
        visitLocation: data.visitorInfo.visitLocation,
        vehicleUsage: data.visitorInfo.vehicleUsage,
        dateOfBirth: data.visitorInfo.dateOfBirth,
        nationality: data.visitorInfo.nationality,
        phoneNumber: data.visitorInfo.phoneNumber,
        company: data.visitorInfo.company,
        position: data.visitorInfo.position,
        vehicalProvince: data.visitorInfo.vehicalProvince,
        vehicalNumber: data.visitorInfo.vehicalNumber,
        vehicalType: data.visitorInfo.vehicalType,
        vehicalModel: data.visitorInfo.vehicalModel,
      };

      const visitInfo: VisitInfoType = {
        durationStart: data.visitInfo.durationStart,
        durationEnd: data.visitInfo.durationEnd,
        purpose: data.visitInfo.purpose,
        visitPersonName: data.visitInfo.visitPersonName,
        visitPersonPhoneNumber: data.visitInfo.visitPersonPhoneNumber,
        visitPersonEmail: data.visitInfo.visitPersonEmail,
        visitPersonDepartment: data.visitInfo.visitPersonDepartment,
      };

      const status: string = "In Progress";

      const response = await prisma.personnelEntryApplicationForm.create({
        data: {
          requesterFirstName: requesterInfo.firstName,
          requesterLastName: requesterInfo.lastName,
          requesterDateOfBirth: requesterInfo.dateOfBirth,
          requesterPhoneNumber: requesterInfo.phoneNumber,
          requesterCompany: requesterInfo.company,
          requesterEmail: requesterInfo.email,

          visitorFullName: visitorInfo.fullName,
          visitorEmail: visitorInfo.email,
          visitLocation: visitorInfo.visitLocation,
          visitorDateOfBirth: visitorInfo.dateOfBirth,
          visitorPhoneNumber: visitorInfo.phoneNumber,
          visitorCompany: visitorInfo.company,

          durationOfVisitStart: visitInfo.durationStart,
          durationOfVistitEnd: visitInfo.durationEnd,
          purposeOfVisit: visitInfo.purpose,
          infoPersonVisitFullName: visitInfo.visitPersonName,
          infoPersonVisitPhoneNumber: visitInfo.visitPersonPhoneNumber,
          infoPersonVisitEmail: visitInfo.visitPersonEmail,
          infoPersonVisitDepartment: visitInfo.visitPersonDepartment,
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
