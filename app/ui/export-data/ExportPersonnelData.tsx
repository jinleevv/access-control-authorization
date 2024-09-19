"use client";

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";

export function ExportPersonnelData() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  async function handleDownload() {
    try {
      const date_to: Date = addDays(date?.to, 1);
      const response = await fetch("/api/export-personnel-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date_from: date?.from,
          date_to: date_to,
        }),
      });
      if (response.status !== 200) {
        toast("Could not export data from DB");
      } else {
        const data = await response.json();
        const applications = data.applications;

        if (applications.length !== 0) {
          const cleanedData = applications.map(
            ({ id, ...rest }: { id: any }) => rest
          );

          const worksheet = XLSX.utils.json_to_sheet(cleanedData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

          // Buffer to store the generated Excel file
          const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });
          const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          });

          const nameDate = new Date();
          const fileDownloadName =
            "PersonnelEntryApplicationData_" +
            nameDate.toISOString().split("T")[0] +
            ".xlsx";
          saveAs(blob, fileDownloadName);
        } else {
          toast("There is no data that intersect with each other");
        }
      }
    } catch (err) {
      toast("Something went wront, please contact IT department");
    }
  }

  return (
    <div className="flex w-full mt-2 gap-3">
      <div className="w-1/2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full h-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex w-1/2">
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}
