import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

interface RequesterInfoType {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  company: string;
  supervisor: string;
}

interface FormInformationType {
  purpose: string;

  vehicleInformationProvince: string;
  vehicleInformationNumber: string;
  vehicleInformationType: string;

  driverInformationCompany: string;
  driverInformationFullName: string;
  driverInformationEmail: string;
  driverInformationPhoneNumber: string;
  driverInformationPosition: string;

  durationStart: Date;
  durationEnd: Date;

  numberOfCompanions: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // Extract data from the request body
      const data = req.body;

      const status: string = "In Progress";

      const requesterInfo: RequesterInfoType = {
        firstName: data.requesterInfo.firstName,
        lastName: data.requesterInfo.lastName,
        email: data.requesterInfo.email,
        dateOfBirth: data.requesterInfo.dateOfBirth,
        phoneNumber: data.requesterInfo.phoneNumber,
        company: data.requesterInfo.company,
        supervisor: data.requesterInfo.supervisor,
      };

      const formInformation: FormInformationType = {
        purpose: data.formInformation.purpose,

        vehicleInformationProvince:
          data.formInformation.vehicleInformationProvince,
        vehicleInformationNumber: data.formInformation.vehicleInformationNumber,
        vehicleInformationType: data.formInformation.vehicleInformationType,

        driverInformationCompany: data.formInformation.driverInformationCompany,
        driverInformationFullName:
          data.formInformation.driverInformationFullName,
        driverInformationEmail: data.formInformation.driverInformationEmail,
        driverInformationPhoneNumber:
          data.formInformation.driverInformationPhoneNumber,
        driverInformationPosition:
          data.formInformation.driverInformationPosition,

        durationStart: data.formInformation.durationStart,
        durationEnd: data.formInformation.durationEnd,

        numberOfCompanions: data.formInformation.vehicleInformationCompanion,
      };

      const response = await prisma.vehicleEntryApplicationForm.create({
        data: {
          requesterFirstName: requesterInfo.firstName,
          requesterLastName: requesterInfo.lastName,
          requesterDateOfBirth: requesterInfo.dateOfBirth,
          requesterPhoneNumber: requesterInfo.phoneNumber,
          requesterCompany: requesterInfo.company,
          requesterEmail: requesterInfo.email,

          vehicleProvince: formInformation.vehicleInformationProvince,
          vehicleNumber: formInformation.vehicleInformationNumber,
          vehicleType: formInformation.vehicleInformationType,
          numberOfCompanions: formInformation.numberOfCompanions,

          driverCompany: formInformation.driverInformationCompany,
          driverName: formInformation.driverInformationFullName,
          driverEmail: formInformation.driverInformationEmail,
          driverPhoneNumber: formInformation.driverInformationPhoneNumber,

          durationOfVisitStart: formInformation.durationStart,
          durationOfVistitEnd: formInformation.durationEnd,

          supervisor: requesterInfo.supervisor,

          status: status,
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
