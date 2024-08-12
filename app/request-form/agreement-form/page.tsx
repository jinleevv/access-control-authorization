"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AgreementPage() {
  const router = useRouter();

  const handleContinue = () => {
    localStorage.setItem("hasCompletedAgreement", "true");
    router.push("/request-form");
  };

  return (
    <div>
      <h1>Welcome to the Request Form</h1>
      <p>
        Please read the instructions carefully before proceeding to the request
        form.
      </p>
      <Button onClick={handleContinue}>Continue to Request Form</Button>
    </div>
  );
}
