"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { toast } from "sonner";
import { useState } from "react";

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

let formSchema = z.object({
  security_report_title: z.string().min(1),
  security_report_to: z.string().min(1),
  security_report_message: z.string().min(1),
});

export default function Reports({ user }: ReportsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      security_report_to: "",
      security_report_title: "",
      security_report_message: "",
    },
  });
  const emails = [
    { email: "security@ultiumcam.com", label: "Security Team" },
    { email: "it@ultiumcam.com", label: "IT Department" },
    { email: "hr@ultiumcam.com", label: "Human Resources" },
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
