"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PersonnelDetailInformation {
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

  supervisor: string;

  status: string;

  createdAt: string;
  updatedAt: string;
}

export function PersonnelApprovalDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<PersonnelDetailInformation | null>(null);
  const id = sessionStorage.getItem("personnelId");

  useEffect(() => {
    if (id) {
      try {
        // First, try fetching from the vehicle-pending-approvals API
        fetch(`/api/personnel-pending-approvals/${id}`)
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (error) {
        console.log("Personnel API failed", error);
      }
    }
  }, [id]);

  async function handleApprove() {
    const applicationID = id;

    try {
      const response = await fetch("/api/personnel-application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved", id: applicationID }),
      });

      if (response.ok) {
        toast("Approved successfully");
        router.refresh();
      }
    } catch (e) {
      toast("Failed to approve the application, please contact IT department");
    }
  }

  async function handleReject() {
    const applicationID = id;

    try {
      const response = await fetch("/api/personnel-application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected", id: applicationID }),
      });

      if (response.ok) {
        toast("Rejected successfully");
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

      <div className="flex w-full justify-end space-x-2">
        <Button onClick={handleApprove}>Approve</Button>
        <Button variant={"destructive"} onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
}
