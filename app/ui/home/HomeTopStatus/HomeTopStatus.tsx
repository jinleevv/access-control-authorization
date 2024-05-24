"use client";

import { Label } from "@/components/ui/label";
import { IoLayers, IoArchiveSharp, IoAlertCircle } from "react-icons/io5";
import CountUp from "react-countup";

export function HomeTopStatus() {
  return (
    <div className="flex flex-col-3 justify-between gap-3">
      <div className="flex w-1/3 p-4 rounded-xl border">
        <div className="mt-1 mr-2">
          <IoLayers />
        </div>
        <div className="grid w-full">
          <Label className="text-md font-bold">Pending Request Forms:</Label>
          <Label className="flex mt-3 text-2xl w-full justify-center">
            <CountUp decimals={0} decimal="" prefix="" end={50} duration={1} />
          </Label>
        </div>
      </div>
      <div className="flex w-1/3 p-4 rounded-xl border">
        <div className="mt-1 mr-2">
          <IoArchiveSharp />
        </div>
        <div className="grid w-full">
          <Label className="text-md font-bold">Completed Request Forms:</Label>
          <Label className="flex mt-3 text-2xl w-full justify-center">
            <CountUp decimals={0} decimal="" prefix="" end={100} duration={1} />
          </Label>
        </div>
      </div>
      <div className="flex w-1/3 p-4 rounded-xl border">
        <div className="mt-1 mr-2">
          <IoAlertCircle />
        </div>
        <div className="grid w-full">
          <Label className="text-md font-bold">Rejected Request Forms:</Label>
          <Label className="flex mt-3 text-2xl w-full justify-center">
            <CountUp decimals={0} decimal="" prefix="" end={30} duration={1} />
          </Label>
        </div>
      </div>
    </div>
  );
}
