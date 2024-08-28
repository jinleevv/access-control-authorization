"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";

interface VehiclePendingApprovalsProps {
  data: any;
}

export function VehiclePendingApprovals({ data }: VehiclePendingApprovalsProps) {
  // async function handleEmail() {
  //   const response = await fetch("/api/send-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.ok) {
  //     // const data = await response.json();
  //   } else {
  //     console.error("Failed to submit form:", response.statusText);
  //   }
  // }

  return (
    <section className="h-full">
      {/* <div><Button onClick={handleEmail}>Send Email</Button></div> */}
      <DataTable columns={columns} data={data} />
    </section>
  );
}
