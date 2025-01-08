"use client";

import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import { useEffect } from "react";

interface ReportsProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    admin: boolean;
    security: boolean;
    departmentIT: boolean;
  };
}

const formSchema = z.object({
  security_report_title: z.string().min(1),
  security_report_to: z.string().min(1),
  security_report_message: z.string().min(1),
  security_report_type: z.enum(["daily_report", "incident_report"], {
    required_error: "You need to select a report type.",
  }),
});

export default function Reports({ user }: ReportsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // security_report_type: "daily_report",
      security_report_to: "",
      security_report_title: "",
      security_report_message: "",
    },
  });

  const reportType = form.watch("security_report_type");

  useEffect(() => {
    if (reportType === "daily_report") {
      form.setValue(
        "security_report_message",
        `
          **Daily Report**
          Security Officier Name: ${user.firstName} ${user.lastName}
          **Summary of the day’s activities**: _________________
          **Tasks completed**: _________________
          **Notes or observations**: _________________
        `
      );
    } else if (reportType === "incident_report") {
      form.setValue(
        "security_report_message",
        `
        **Incident Report**
        Security Officier Name: ${user.firstName} ${user.lastName}
        **Date of Incident (Day, Month, Year):** _________________
        **Time of Incident:** ________________

        **Was external emergency personnel contacted (9-1-1 or others)?**
        ☐ Yes ☐ No

        **Was internal monitoring personnel contacted?**
        ☐ Yes ☐ No

        **If yes, provide the name of the internal personnel contacted:**
        _________________________________________________

        **What is the nature of the incident?**
        _________________________________________________

        **Exact location of the incident:**
        _________________________________________________

        **List of persons directly involved in the incident (with their phone numbers):**
        _________________________________________________

        **Witnesses of the incident (with their phone numbers):**
        _________________________________________________

        **Detailed description of the incident:**
        → The security officer must report only facts / No opinions should be provided
        _________________________________________________

        **Security Officer Name:** ____________________________________
        **BSP Permit Number:** GAR- ____________________________________
        **Security Officer Signature:** ____________________________________
      `
      );
    }
  });

  const emails = [
    { email: "skjeong23@ultiumcam.net", label: "Soonki Jeong" },
    { email: "andre.martel@ultiumcam.net", label: "André Martel" },
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const emailResponse = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailTo: values.security_report_to,
        subject: `[NO REPLY] [Access Control Authorization System] ${values.security_report_title}, ${user.firstName}`,
        text: `${values.security_report_message}`,
      }),
    });
    if (emailResponse.ok) {
    } else {
      toast("Failed to send an email");
    }
  }
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="security_report_type"
            render={({ field }) => (
              <FormItem className="flex mt-4 space-x-3">
                <div>
                  <FormLabel>Security Report Type:</FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex h-full space-x-1"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="daily_report" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Daily Report
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="incident_report" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Incident Report
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_report_title"
            render={({ field }) => (
              <FormItem className="flex w-full gap-2">
                <FormLabel className="w-10 m-auto font-bold">Title:</FormLabel>
                <FormControl>
                  <Input className="rounded-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_report_to"
            render={({ field }) => (
              <FormItem className="flex w-full gap-2">
                <FormLabel className="w-10 m-auto font-bold">To:</FormLabel>
                <FormControl>
                  <Command className="rounded-lg border">
                    <CommandInput
                      placeholder="Search for an email..."
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                    <CommandList>
                      {field.value === "" ? (
                        <></>
                      ) : (
                        <>
                          <CommandEmpty>No emails found.</CommandEmpty>
                          <CommandGroup heading="Email Addresses">
                            {emails.map((email) => (
                              <CommandItem
                                key={email.email}
                                value={email.email}
                                onSelect={(value) => {
                                  form.clearErrors("security_report_to");
                                  form.setValue("security_report_to", value);
                                  field.onChange(value);
                                }}
                              >
                                <span>
                                  {email.label} ({email.email})
                                </span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </>
                      )}
                    </CommandList>
                  </Command>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security_report_message"
            render={({ field }) => (
              <FormItem className="w-full gap-2">
                <FormLabel className="w-10 m-auto font-bold">
                  Message:
                </FormLabel>
                <FormControl>
                  <Textarea className="rounded-lg h-[400px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
