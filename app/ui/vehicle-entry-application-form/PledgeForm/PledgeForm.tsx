"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { toast } from "sonner";
import { VehicleEntryApplication } from "../RequestForm/VehicleEntryApplication";

interface PledgeFormProps {
  requester: any;
}

export function PledgeForm({ requester }: PledgeFormProps) {
  const [signed, setSigned] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  function handleButton() {
    const fullName = requester.firstName + " " + requester.lastName;
    if (name.toUpperCase() == fullName) {
      setSigned(true);
    } else {
      toast("Please sign your full name before proceeding.");
    }
  }

  return (
    <div className="h-full w-full p-2 space-y-3">
      <VehicleEntryApplication requester={requester} signed={signed} />
    </div>
  );
}
