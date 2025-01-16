"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VehicleDetailInformation {
  id: string;
  pledgeSigned: boolean;

  status: string;
  createdAt: string;
  updatedAt: string;

  driverCompany: string;
  driverFullName: string;
  driverEmail: string;
  driverPhoneNumber: string;

  durationStart: string;
  durationEnd: string;

  requesterDepartment: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterEmail: string;

  vehicleNumber: string;
  vehicleProvince: string;
  vehicleType: string;
  vehicleCompanions: string;

  supervisorEmail: string;
}

const VehicleApprovalDetailPage = ({ userSession }: any) => {
  const router = useRouter();
  const [data, setData] = useState<VehicleDetailInformation | null>(null);
  const id = sessionStorage.getItem("vehicleId");

  useEffect(() => {
    if (id) {
      try {
        // First, try fetching from the vehicle-pending-approvals API
        fetch(`/api/vehicle-pending-approvals/${id}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (error) {
        console.log("Vehicle API failed", error);
      }
    }
  }, [id]);

  async function handleApprove() {
    const applicationID = id;

    try {
      const response = await fetch("/api/vehicle-application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved", id: applicationID }),
      });

      if (response.ok) {
        toast("Approved successfully");
        router.push("/pending-approvals");
        router.refresh();
      }
    } catch (e) {
      toast("Failed to approve the application, please contact IT department");
    }
  }

  async function handleReject() {
    const applicationID = id;

    try {
      const response = await fetch("/api/vehicle-application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected", id: applicationID }),
      });

      if (response.ok) {
        toast("Rejected successfully");
        router.push("/pending-approvals");
        router.refresh();
      }
    } catch (e) {
      toast("Failed to approve the application, please contact IT department");
    }
  }

  if (data === null) return <div>Loading data...</div>;

  return (
    <div className="p-4 w-full h-full space-y-4">
      <div>
        <Label className="text-lg font-bold">Approval Details</Label>
      </div>
      <div className="w-full space-y-5 p-3">
        <div className="flex w-full p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Approver: <Label>{data.supervisorEmail}</Label>
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
        <div className="w-full border rounded-lg p-4 space-y-3">
          <div className="flex p-3 justify-between border rounded-lg">
            <Label className="font-bold">
              Requester Name:{" "}
              <Label>
                {data.requesterFirstName} {data.requesterLastName}
              </Label>
            </Label>
            <Label className="font-bold">
              Requester Email: <Label>{data.requesterEmail}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between border rounded-lg">
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
              Number of Companions: <Label>{data.vehicleCompanions}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between border rounded-lg">
            <Label className="font-bold">
              Driver Full Name: <Label>{data.driverFullName}</Label>
            </Label>
            <Label className="font-bold">
              Driver Phone Number: <Label>{data.driverPhoneNumber}</Label>
            </Label>
            <Label className="font-bold">
              Driver Email: <Label>{data.driverEmail}</Label>
            </Label>
            <Label className="font-bold">
              Driver Company: <Label>{data.driverCompany}</Label>
            </Label>
          </div>
          <div className="flex p-3 justify-between border rounded-lg">
            <Label className="font-bold">
              Duration:{" "}
              <Label>
                {data.durationStart.split("T")[0]} ~{" "}
                {data.durationEnd.split("T")[0]}
              </Label>
            </Label>
          </div>
        </div>
        {userSession.admin ? (
          <div className="flex w-full justify-end space-x-2">
            <Button onClick={handleApprove}>Approve</Button>
            <Button variant={"destructive"} onClick={handleReject}>
              Reject
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default VehicleApprovalDetailPage;
