"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PersonnelDetailInformation {
  id: string;
  pledgeSigned: boolean;

  requesterFirstName: string;
  requesterLastName: string;
  requesterDateOfBirth: string;
  requesterPhoneNumber: string;
  requesterCompany: string;

  visitorFullName: string;
  visitorVisitLocation: string;
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

  purpose: string;

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
      const response = await fetch("/api/personnel-application-approval", {
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

  if (data == null)
    return (
      <div role="status" className="flex w-full h-full">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 m-auto"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );

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
            Application Type:<Label> Personnel Entry Approval Form</Label>
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
        <div className="flex p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Purpose: <Label>{data.purpose}</Label>
          </Label>
        </div>
        <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Visitor Full Name: <Label>{data.visitorFullName}</Label>
          </Label>
          <Label className="font-bold">
            Visitor Visit Location: <Label>{data.visitorVisitLocation}</Label>
          </Label>
          <Label className="font-bold">
            Visitor Date of Birth:{" "}
            <Label>{data.visitorDateOfBirth.split("T")[0]}</Label>
          </Label>
          <Label className="font-bold">
            Visitor Phone Number: <Label>{data.visitorPhoneNumber}</Label>
          </Label>
          <Label className="font-bold">
            Visitor Company: <Label>{data.visitorCompany}</Label>
          </Label>
          <Label className="font-bold">
            Visitor Position: <Label>{data.visitorPosition}</Label>
          </Label>
        </div>
        <div className="grid grid-cols-1 gap-y-5 p-3 justify-between border rounded-lg h-72 2xl:h-96 overflow-auto">
          <Label className="font-bold text-md">Companion Information</Label>
          {data.companionFullName1 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 1 Full Name: <Label>{data.companionFullName1}</Label>
              </Label>
              <Label className="font-bold">
                Companion 1 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth1.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 1 Nationality:
                <Label>{data.companionNationality1}</Label>
              </Label>
              <Label className="font-bold">
                Companion 1 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber1}</Label>
              </Label>
              <Label className="font-bold">
                Companion 1 Company: <Label>{data.companionCompany1}</Label>
              </Label>
              <Label className="font-bold">
                Companion 1 Position: <Label>{data.companionPosition1}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName2 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 2 Full Name: <Label>{data.companionFullName2}</Label>
              </Label>
              <Label className="font-bold">
                Companion 2 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth2.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 2 Nationality:
                <Label>{data.companionNationality2}</Label>
              </Label>
              <Label className="font-bold">
                Companion 2 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber2}</Label>
              </Label>
              <Label className="font-bold">
                Companion 2 Company: <Label>{data.companionCompany2}</Label>
              </Label>
              <Label className="font-bold">
                Companion 2 Position: <Label>{data.companionPosition2}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName3 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 3 Full Name: <Label>{data.companionFullName3}</Label>
              </Label>
              <Label className="font-bold">
                Companion 3 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth3.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 3 Nationality:
                <Label>{data.companionNationality3}</Label>
              </Label>
              <Label className="font-bold">
                Companion 3 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber3}</Label>
              </Label>
              <Label className="font-bold">
                Companion 3 Company: <Label>{data.companionCompany3}</Label>
              </Label>
              <Label className="font-bold">
                Companion 3 Position: <Label>{data.companionPosition3}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName4 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 4 Full Name: <Label>{data.companionFullName4}</Label>
              </Label>
              <Label className="font-bold">
                Companion 4 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth4.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 4 Nationality:
                <Label>{data.companionNationality4}</Label>
              </Label>
              <Label className="font-bold">
                Companion 4 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber4}</Label>
              </Label>
              <Label className="font-bold">
                Companion 4 Company: <Label>{data.companionCompany4}</Label>
              </Label>
              <Label className="font-bold">
                Companion 4 Position: <Label>{data.companionPosition4}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName5 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 5 Full Name: <Label>{data.companionFullName5}</Label>
              </Label>
              <Label className="font-bold">
                Companion 5 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth5.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 5 Nationality:
                <Label>{data.companionNationality5}</Label>
              </Label>
              <Label className="font-bold">
                Companion 5 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber5}</Label>
              </Label>
              <Label className="font-bold">
                Companion 5 Company: <Label>{data.companionCompany5}</Label>
              </Label>
              <Label className="font-bold">
                Companion 5 Position: <Label>{data.companionPosition5}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName6 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 6 Full Name: <Label>{data.companionFullName6}</Label>
              </Label>
              <Label className="font-bold">
                Companion 6 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth6.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 6 Nationality:
                <Label>{data.companionNationality6}</Label>
              </Label>
              <Label className="font-bold">
                Companion 6 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber6}</Label>
              </Label>
              <Label className="font-bold">
                Companion 6 Company: <Label>{data.companionCompany6}</Label>
              </Label>
              <Label className="font-bold">
                Companion 6 Position: <Label>{data.companionPosition6}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName7 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 7 Full Name: <Label>{data.companionFullName7}</Label>
              </Label>
              <Label className="font-bold">
                Companion 7 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth7.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 7 Nationality:
                <Label>{data.companionNationality7}</Label>
              </Label>
              <Label className="font-bold">
                Companion 7 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber7}</Label>
              </Label>
              <Label className="font-bold">
                Companion 7 Company: <Label>{data.companionCompany7}</Label>
              </Label>
              <Label className="font-bold">
                Companion 7 Position: <Label>{data.companionPosition7}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
          {data.companionFullName8 != "" ? (
            <div className="grid grid-cols-3 gap-y-5 p-3 justify-between border rounded-lg">
              <Label className="font-bold">
                Companion 8 Full Name: <Label>{data.companionFullName8}</Label>
              </Label>
              <Label className="font-bold">
                Companion 8 Date of Birth:{" "}
                <Label>{data.companionDateOfBirth8.split("T")[0]}</Label>
              </Label>
              <Label className="font-bold">
                Companion 8 Nationality:
                <Label>{data.companionNationality8}</Label>
              </Label>
              <Label className="font-bold">
                Companion 8 Phone Number:{" "}
                <Label>{data.comapnionPhoneNumber8}</Label>
              </Label>
              <Label className="font-bold">
                Companion 8 Company: <Label>{data.companionCompany8}</Label>
              </Label>
              <Label className="font-bold">
                Companion 8 Position: <Label>{data.companionPosition8}</Label>
              </Label>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex w-full p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Duration:{" "}
            <Label>
              {data.durationOfVisitStart.split("T")[0]} ~{" "}
              {data.durationOfVistitEnd.split("T")[0]}
            </Label>
          </Label>
        </div>
        <div className="flex w-full p-3 justify-between border rounded-lg">
          <Label className="font-bold">
            Person to Visit Full Name:{" "}
            <Label>{data.infoPersonVisitFullName}</Label>
          </Label>
          <Label className="font-bold">
            Person to Visit Phone Number:{" "}
            <Label>{data.infoPersonVisitPhoneNumber}</Label>
          </Label>
          <Label className="font-bold">
            Person to Visit Company:{" "}
            <Label>{data.infoPersonVisitCompany}</Label>
          </Label>
          <Label className="font-bold">
            Person to Visit Department:{" "}
            <Label>{data.infoPersonVisitDepartment}</Label>
          </Label>
        </div>
      </div>
      <div className="flex w-full p-3 justify-end space-x-2">
        <Button onClick={handleApprove}>Approve</Button>
        <Button variant={"destructive"} onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
}
