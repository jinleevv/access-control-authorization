"use client";

import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface ManageApprovalsProps {
  vehicleData: any;
}

export default function ManageApprovalsData({
  vehicleData,
}: ManageApprovalsProps) {
  return (
    <div className="w-full h-full">
      <div className="mt-6 ml-10 mr-10">
        <Label className="font-bold text-lg">
          Vehicle Entry Application Forms
        </Label>
        <div className="h-[340px] 2xl:h-[400px] mt-2 border rounded-lg overflow-auto">
          <DataTable columns={columns} data={vehicleData} />
        </div>
      </div>
    </div>
  );
}
