"use client";

import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface ManageApprovalsProps {
  personnelData: any;
  vehicleData: any;
}

export default function ManageApprovals({
  personnelData,
  vehicleData,
}: ManageApprovalsProps) {

  return (
    <div className="w-full h-full">
      <div className="ml-10 mr-10">
        <DataTable columns={columns} data={personnelData} />
      </div>
      <div className="mt-5 ml-10 mr-10">
        <DataTable columns={columns} data={vehicleData} />
      </div>
    </div>
  );
}
