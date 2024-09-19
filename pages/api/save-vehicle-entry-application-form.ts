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
  applicationType: string;
  purpose: string;

  vehicleInformationProvince: string;
  vehicleInformationNumber: string;
  vehicleInformationType: string;
  vehicleInformationModel: string;

  driverInformationCompany: string;
  driverInformationFullName: string;
  driverInformationPhoneNumber: string;
  driverInformationPosition: string;

  durationStart: Date;
  durationEnd: Date;
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
        applicationType: data.formInformation.applicationType,
        purpose: data.formInformation.purpose,

        vehicleInformationProvince:
          data.formInformation.vehicleInformationProvince,
        vehicleInformationNumber: data.formInformation.vehicleInformationNumber,
        vehicleInformationType: data.formInformation.vehicleInformationType,
        vehicleInformationModel: data.formInformation.vehicleInformationModel,

        driverInformationCompany: data.formInformation.driverInformationCompany,
        driverInformationFullName:
          data.formInformation.driverInformationFullName,
        driverInformationPhoneNumber:
          data.formInformation.driverInformationPhoneNumber,
        driverInformationPosition:
          data.formInformation.driverInformationPosition,

        durationStart: data.formInformation.durationStart,
        durationEnd: data.formInformation.durationEnd,
      };

      const response = await prisma.vehicleEntryApplicationForm.create({
        data: {
          requesterFirstName: requesterInfo.firstName,
          requesterLastName: requesterInfo.lastName,
          requesterDateOfBirth: requesterInfo.dateOfBirth,
          requesterPhoneNumber: requesterInfo.phoneNumber,
          requesterCompany: requesterInfo.company,
          requesterEmail: requesterInfo.email,

          applicationType: formInformation.applicationType,
          purpose: formInformation.purpose,

          vehicleProvince: formInformation.vehicleInformationProvince,
          vehicleNumber: formInformation.vehicleInformationNumber,
          vehicleType: formInformation.vehicleInformationType,
          vehicleModel: formInformation.vehicleInformationModel,

          driverCompany: formInformation.driverInformationCompany,
          driverName: formInformation.driverInformationFullName,
          driverPhoneNumber: formInformation.driverInformationPhoneNumber,
          driverPosition: formInformation.driverInformationPosition,

          durationOfVisitStart: formInformation.durationStart,
          durationOfVistitEnd: formInformation.durationEnd,

          supervisor: requesterInfo.supervisor,
          pledgeSigned: data.pledgeSigned,
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
