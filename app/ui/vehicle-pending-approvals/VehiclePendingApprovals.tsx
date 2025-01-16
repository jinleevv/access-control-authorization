"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";

interface VehiclePendingApprovalsProps {
  data: any;
}

export async function VehiclePendingApprovals({
  data,
}: VehiclePendingApprovalsProps) {

  return (
    <section className="h-full p-2 border rounded-lg overflow-auto">
      <DataTable columns={columns} data={data}/>
    </section>
  );
}
