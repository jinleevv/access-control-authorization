"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PersonnelPendingApprovals = {
  id: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterDateOfBirth: string;
  requesterPhoneNumber: string;
  requesterCompany: string;
  visitorFullName: string;
  visitorDateOfBirth: string;
  visitorPhoneNumber: string;
  visitorCompany: string;
  visitorPosition: string;
  visitorVehicalProvince: string;
  visitorVehicalNumber: string;
  visitorVehicalType: string;
  visitorVehicalModel: string;
  companionFullName1: string;
  companionDateOfBirth1: string;
  companionNationality1: string;
  comapnionPhoneNumber1: string;
  companionCompany1: string;
  companionPosition1: string;
  companionFullName2: string;
  companionDateOfBirth2: string;
  companionNationality2: string;
  comapnionPhoneNumber2: string;
  companionCompany2: string;
  companionPosition2: string;
  companionFullName3: string;
  companionDateOfBirth3: string;
  companionNationality3: string;
  comapnionPhoneNumber3: string;
  companionCompany3: string;
  companionPosition3: string;
  companionFullName4: string;
  companionDateOfBirth4: string;
  companionNationality4: string;
  comapnionPhoneNumber4: string;
  companionCompany4: string;
  companionPosition4: string;
  companionFullName5: string;
  companionDateOfBirth5: string;
  companionNationality5: string;
  comapnionPhoneNumber5: string;
  companionCompany5: string;
  companionPosition5: string;
  companionFullName6: string;
  companionDateOfBirth6: string;
  companionNationality6: string;
  comapnionPhoneNumber6: string;
  companionCompany6: string;
  companionPosition6: string;
  companionFullName7: string;
  companionDateOfBirth7: string;
  companionNationality7: string;
  comapnionPhoneNumber7: string;
  companionCompany7: string;
  companionPosition7: string;
  companionFullName8: string;
  companionDateOfBirth8: string;
  companionNationality8: string;
  comapnionPhoneNumber8: string;
  companionCompany8: string;
  companionPosition8: string;
  durationOfVisitStart: string;
  durationOfVistitEnd: string;
  purposeOfVisit: string;
  infoPersonVisitFullName: string;
  infoPersonVisitPhoneNumber: string;
  infoPersonVisitCompany: string;
  infoPersonVisitDepartment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<PersonnelPendingApprovals>[] = [
  {
    accessorKey: "requesterFirstName",
    header: "Requester First Name",
  },
  {
    accessorKey: "requesterLastName",
    header: "Requester Last Name",
  },
  {
    accessorKey: "requesterPhoneNumber",
    header: "Requester Phone Number",
  },
];
