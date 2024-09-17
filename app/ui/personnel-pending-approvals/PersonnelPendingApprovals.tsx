"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface PersonnelPendingApprovalsProps {
  data: any;
}

export function PersonnelPendingApprovals({
  data,
}: PersonnelPendingApprovalsProps) {
  async function handleEmail() {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // const data = await response.json();
    } else {
      console.error("Failed to submit form:", response.statusText);
    }
  }

  return (
    <section className="h-full p-2 border rounded-lg overflow-auto">
      <div>
        <Button onClick={handleEmail}>Send Email</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
