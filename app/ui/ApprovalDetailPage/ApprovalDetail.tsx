"use client";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface VehicleApprovalDetailProps {
  id: string;
}

interface VehicleDetailInformation {
  id: string;
  pledgeSigned: boolean;
  purpose: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  applicationType: string;

  driverCompany: string;
  driverName: string;
  driverPhoneNumber: string;
  driverPosition: string;

  durationOfVisitStart: string;
  durationOfVistitEnd: string;

  requesterCompany: string;
  requesterDateOfBirth: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterPhoneNumber: string;

  vehicleModel: string;
  vehicleNumber: string;
  vehicleProvince: string;
  vehicleType: string;

  supervisor: string;
}

const VehicleApprovalDetailPage = ({ id }: VehicleApprovalDetailProps) => {
  const [data, setData] = useState<VehicleDetailInformation>({
    id: "",
    pledgeSigned: false,
    purpose: "",
    status: "In Progress",
    createdAt: "",
    updatedAt: "",

    applicationType: "",

    driverCompany: "",
    driverName: "",
    driverPhoneNumber: "",
    driverPosition: "",

    durationOfVisitStart: "",
    durationOfVistitEnd: "",

    requesterCompany: "",
    requesterDateOfBirth: "",
    requesterFirstName: "",
    requesterLastName: "",
    requesterPhoneNumber: "",

    vehicleModel: "",
    vehicleNumber: "",
    vehicleProvince: "",
    vehicleType: "",

    supervisor: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch the specific approval data using the `id`
      fetch(`/api/vehicle-pending-approvals/${id}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }
  }, [id]);

  function formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/([0-9]+)/g, " $1") // Add space before numbers
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }

  if (data.id === "") return <div>Loading data...</div>;

  console.log(data);

  return (
    <div className="p-4 w-full h-full space-y-4">
      <div>
        <Label className="text-lg font-bold">Approval Details</Label>
      </div>
      <div className="w-full space-y-5 p-3">
        <div className="flex w-full p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Approver: <Label>{data.supervisor}</Label>
          </Label>
          <Label className="font-bold">
            Application Type:<Label> {data.applicationType}</Label>
          </Label>
          <Label className="font-bold">
            Status: <Label>{data.status}</Label>
          </Label>
          <Label className="font-bold">
            Created At: <Label>{data.createdAt.split("T")[0]}</Label>{" "}
          </Label>
          <Label className="font-bold">
            Pledge Signed:{" "}
            <Label>{data.pledgeSigned === true ? "Yes" : "No"}</Label>
          </Label>
        </div>
        <div className="flex w-full p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Document Number: <Label>{data.id}</Label>
          </Label>
        </div>
        <div className="w-full border rounded-lg p-4">
          <div className="flex p-3 justify-between border rounded-lg">
            <Label className="font-bold">
              Requester Name:{" "}
              <Label>
                {data.requesterFirstName} {data.requesterLastName}
              </Label>
            </Label>
            <Label className="font-bold">
              Requester Date Of Birth:{" "}
              <Label>{data.requesterDateOfBirth.split("T")[0]}</Label>
            </Label>
            <Label className="font-bold">
              Requester Phone Number: <Label>{data.requesterPhoneNumber}</Label>
            </Label>
            <Label className="font-bold">
              Requester Company: <Label>{data.requesterCompany}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between">
            <Label className="font-bold">
              Purpose: <Label>{data.purpose}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between">
            <Label className="font-bold">
              Vehicle Number: <Label>{data.vehicleNumber}</Label>
            </Label>
            <Label className="font-bold">
              Vehicle Province: <Label>{data.vehicleProvince}</Label>
            </Label>
            <Label className="font-bold">
              Vehicle Type: <Label>{data.vehicleType}</Label>
            </Label>
            <Label className="font-bold">
              Vehicle Model: <Label>{data.vehicleModel}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between">
            <Label className="font-bold">
              Driver Name: <Label>{data.driverName}</Label>
            </Label>
            <Label className="font-bold">
              Driver Phone Number: <Label>{data.driverPhoneNumber}</Label>
            </Label>
            <Label className="font-bold">
              Driver Position: <Label>{data.driverPosition}</Label>
            </Label>
            <Label className="font-bold">
              Driver Company: <Label>{data.driverCompany}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between">
            <Label className="font-bold">
              Duration:{" "}
              <Label>
                {data.durationOfVisitStart.split("T")[0]} ~{" "}
                {data.durationOfVistitEnd.split("T")[0]}
              </Label>
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleApprovalDetailPage;
