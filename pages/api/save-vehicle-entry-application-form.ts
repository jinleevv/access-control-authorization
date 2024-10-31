import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

interface RequesterInfoType {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  supervisor: string;
}

interface FormInformationType {
  vehicleInformationProvince: string;
  vehicleInformationNumber: string;
  vehicleInformationType: string;
  numberOfCompanions: string;

  driverInformationCompany: string;
  driverInformationFullName: string;
  driverInformationEmail: string;
  driverInformationPhoneNumber: string;

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
        department: data.requesterInfo.department,
        supervisor: data.requesterInfo.supervisor,
      };

      const formInformation: FormInformationType = {
        vehicleInformationProvince:
          data.formInformation.vehicleInformationProvince,
        vehicleInformationNumber: data.formInformation.vehicleInformationNumber,
        vehicleInformationType: data.formInformation.vehicleInformationType,
        numberOfCompanions: data.formInformation.vehicleInformationCompanion,

        driverInformationCompany: data.formInformation.driverInformationCompany,
        driverInformationFullName:
          data.formInformation.driverInformationFullName,
        driverInformationEmail: data.formInformation.driverInformationEmail,
        driverInformationPhoneNumber:
          data.formInformation.driverInformationPhoneNumber,

        durationStart: data.formInformation.durationStart,
        durationEnd: data.formInformation.durationEnd,
      };

      const response = await prisma.vehicleEntryApplicationForm.create({
        data: {
          requesterFirstName: requesterInfo.firstName,
          requesterLastName: requesterInfo.lastName,
          requesterDepartment: requesterInfo.department,
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
