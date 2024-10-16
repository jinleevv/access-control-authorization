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

interface CompanionInfotype {
  fullName0: string;
  birthDate0: Date;
  nationality0: string;
  phoneNumber0: string;
  company0: string;
  position0: string;

  fullName1: string;
  birthDate1: Date;
  nationality1: string;
  phoneNumber1: string;
  company1: string;
  position1: string;

  fullName2: string;
  birthDate2: Date;
  nationality2: string;
  phoneNumber2: string;
  company2: string;
  position2: string;

  fullName3: string;
  birthDate3: Date;
  nationality3: string;
  phoneNumber3: string;
  company3: string;
  position3: string;

  fullName4: string;
  birthDate4: Date;
  nationality4: string;
  phoneNumber4: string;
  company4: string;
  position4: string;

  fullName5: string;
  birthDate5: Date;
  nationality5: string;
  phoneNumber5: string;
  company5: string;
  position5: string;

  fullName6: string;
  birthDate6: Date;
  nationality6: string;
  phoneNumber6: string;
  company6: string;
  position6: string;

  fullName7: string;
  birthDate7: Date;
  nationality7: string;
  phoneNumber7: string;
  company7: string;
  position7: string;
}

interface VisitInfoType {
  durationStart: Date;
  durationEnd: Date;
  purpose: string;
  visitPersonName: string;
  visitPersonPhoneNumber: string;
  visitPersonCompany: string;
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

      const companionInfo: CompanionInfotype = {
        fullName0: data.companionInfo.fullName0,
        birthDate0: data.companionInfo.birthDate0,
        nationality0: data.companionInfo.nationality0,
        phoneNumber0: data.companionInfo.phoneNumber0,
        company0: data.companionInfo.company0,
        position0: data.companionInfo.position0,

        fullName1: data.companionInfo.fullName1,
        birthDate1: data.companionInfo.birthDate1,
        nationality1: data.companionInfo.nationality1,
        phoneNumber1: data.companionInfo.phoneNumber1,
        company1: data.companionInfo.company1,
        position1: data.companionInfo.position1,

        fullName2: data.companionInfo.fullName2,
        birthDate2: data.companionInfo.birthDate2,
        nationality2: data.companionInfo.nationality2,
        phoneNumber2: data.companionInfo.phoneNumber2,
        company2: data.companionInfo.company2,
        position2: data.companionInfo.position2,

        fullName3: data.companionInfo.fullName3,
        birthDate3: data.companionInfo.birthDate3,
        nationality3: data.companionInfo.nationality3,
        phoneNumber3: data.companionInfo.phoneNumber3,
        company3: data.companionInfo.company3,
        position3: data.companionInfo.position3,

        fullName4: data.companionInfo.fullName4,
        birthDate4: data.companionInfo.birthDate4,
        nationality4: data.companionInfo.nationality4,
        phoneNumber4: data.companionInfo.phoneNumber4,
        company4: data.companionInfo.company4,
        position4: data.companionInfo.position4,

        fullName5: data.companionInfo.fullName5,
        birthDate5: data.companionInfo.birthDate5,
        nationality5: data.companionInfo.nationality5,
        phoneNumber5: data.companionInfo.phoneNumber5,
        company5: data.companionInfo.company5,
        position5: data.companionInfo.position5,

        fullName6: data.companionInfo.fullName6,
        birthDate6: data.companionInfo.birthDate6,
        nationality6: data.companionInfo.nationality6,
        phoneNumber6: data.companionInfo.phoneNumber6,
        company6: data.companionInfo.company6,
        position6: data.companionInfo.position6,

        fullName7: data.companionInfo.fullName7,
        birthDate7: data.companionInfo.birthDate7,
        nationality7: data.companionInfo.nationality7,
        phoneNumber7: data.companionInfo.phoneNumber7,
        company7: data.companionInfo.company7,
        position7: data.companionInfo.position7,
      };

      const visitInfo: VisitInfoType = {
        durationStart: data.visitInfo.durationStart,
        durationEnd: data.visitInfo.durationEnd,
        purpose: data.visitInfo.purpose,
        visitPersonName: data.visitInfo.visitPersonName,
        visitPersonPhoneNumber: data.visitInfo.visitPersonPhoneNumber,
        visitPersonCompany: data.visitInfo.visitPersonCompany,
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
          visitorVisitLocation: visitorInfo.visitLocation,
          visitorDateOfBirth: visitorInfo.dateOfBirth,
          visitorPhoneNumber: visitorInfo.phoneNumber,
          visitorCompany: visitorInfo.company,
          visitorPosition: visitorInfo.position,

          companionFullName1: companionInfo.fullName0,
          companionDateOfBirth1: companionInfo.birthDate0,
          companionNationality1: companionInfo.nationality0,
          comapnionPhoneNumber1: companionInfo.phoneNumber0,
          companionCompany1: companionInfo.company0,
          companionPosition1: companionInfo.position0,

          companionFullName2: companionInfo.fullName1,
          companionDateOfBirth2: companionInfo.birthDate1,
          companionNationality2: companionInfo.nationality1,
          comapnionPhoneNumber2: companionInfo.phoneNumber1,
          companionCompany2: companionInfo.company1,
          companionPosition2: companionInfo.position1,

          companionFullName3: companionInfo.fullName2,
          companionDateOfBirth3: companionInfo.birthDate2,
          companionNationality3: companionInfo.nationality2,
          comapnionPhoneNumber3: companionInfo.phoneNumber2,
          companionCompany3: companionInfo.company2,
          companionPosition3: companionInfo.position2,

          companionFullName4: companionInfo.fullName3,
          companionDateOfBirth4: companionInfo.birthDate3,
          companionNationality4: companionInfo.nationality3,
          comapnionPhoneNumber4: companionInfo.phoneNumber3,
          companionCompany4: companionInfo.company3,
          companionPosition4: companionInfo.position3,

          companionFullName5: companionInfo.fullName4,
          companionDateOfBirth5: companionInfo.birthDate4,
          companionNationality5: companionInfo.nationality4,
          comapnionPhoneNumber5: companionInfo.phoneNumber4,
          companionCompany5: companionInfo.company4,
          companionPosition5: companionInfo.position4,

          companionFullName6: companionInfo.fullName5,
          companionDateOfBirth6: companionInfo.birthDate5,
          companionNationality6: companionInfo.nationality5,
          comapnionPhoneNumber6: companionInfo.phoneNumber5,
          companionCompany6: companionInfo.company5,
          companionPosition6: companionInfo.position5,

          companionFullName7: companionInfo.fullName6,
          companionDateOfBirth7: companionInfo.birthDate6,
          companionNationality7: companionInfo.nationality6,
          comapnionPhoneNumber7: companionInfo.phoneNumber6,
          companionCompany7: companionInfo.company6,
          companionPosition7: companionInfo.position6,

          companionFullName8: companionInfo.fullName7,
          companionDateOfBirth8: companionInfo.birthDate7,
          companionNationality8: companionInfo.nationality7,
          comapnionPhoneNumber8: companionInfo.phoneNumber7,
          companionCompany8: companionInfo.company7,
          companionPosition8: companionInfo.position7,

          durationOfVisitStart: visitInfo.durationStart,
          durationOfVistitEnd: visitInfo.durationEnd,
          purposeOfVisit: visitInfo.purpose,
          infoPersonVisitFullName: visitInfo.visitPersonName,
          infoPersonVisitPhoneNumber: visitInfo.visitPersonPhoneNumber,
          infoPersonVisitCompany: visitInfo.visitPersonCompany,
          infoPersonVisitDepartment: visitInfo.visitPersonDepartment,

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
