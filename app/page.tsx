"use client";

import AppThree from "./ui/landing-page/App";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();

  function handleStart() {
    router.push("/login");
    router.refresh();
  }

  function Overlay() {
    return (
      <div className="flex w-full justify-center">
        <Button
          className="-translate-y-80 2xl:-translate-y-[430px] w-1/6"
          onClick={handleStart}
        >
          start
        </Button>
      </div>
    );
  }

  return (
    <section className="grid w-full h-full">
      <AppThree />
      <Overlay />
    </section>
  );
}
