"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { RequestForm } from "../RequestForm/PersonnelEntryApplicationForm";
import { toast } from "sonner";

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
      {!signed ? (
        <>
          <ScrollArea className="border h-64 rounded-md overflow-auto p-2">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
              tellus eu tellus porta venenatis nec et velit...
            </div>
          </ScrollArea>
          <ScrollArea className="border h-64 rounded-md overflow-auto p-2">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac
              tellus eu tellus porta venenatis nec et velit...
            </div>
          </ScrollArea>
          <div className="flex w-full justify-end space-x-1.5">
            <Input
              className="w-1/4"
              placeholder="Sign your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleButton}>Agree</Button>
          </div>
        </>
      ) : (
        <RequestForm requester={requester} signed={signed} />
      )}
    </div>
  );
}
