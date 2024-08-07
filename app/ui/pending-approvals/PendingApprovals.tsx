"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PendingApprovalsProps {
  requester: any;
}

export async function PendingApprovals({ requester }: PendingApprovalsProps) {
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
    <section className="h-full">
      <div>{/* <Button onClick={handleEmail}>Send Email</Button> */}</div>
    </section>
  );
}
