"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DateRangePicker } from "@nextui-org/date-picker";
import { IoWarning } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { parseZonedDateTime } from "@internationalized/date";

interface RequestFormProps {
  requester: any;
}

let formSchema = z.object({
  visitor_first_name: z.string().min(1).max(50),
  visitor_last_name: z.string().min(1).max(50),
  visitor_email: z.string().min(1).max(100),
  visitor_phone_number: z.string().min(1).max(50),
  visitor_company: z.string().min(1).max(50),

  visitor_visit_location: z.string(),
  id_info: z.string(),

  duration_of_visit: z.any(),
  purpose_of_visit: z.string().min(1).max(50),
  info_person_visit_name: z.string().min(1).max(50),
  info_person_email: z.string().min(1).max(50),
  info_person_department: z.string().min(1).max(50),

  sign: z.boolean().default(false),
});

export function RequestForm({ requester }: RequestFormProps) {
  const currentDate = new Date();
  const timezone = "America/Montreal";

  // Format the current time in the same format as shown in your example
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  // Create the formatted string in the format you need
  const formattedCurrentTime = `${year}-${month}-${day}T${hours}:${minutes}[${timezone}]`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration_of_visit: {
        start: parseZonedDateTime(formattedCurrentTime),
        end: parseZonedDateTime(formattedCurrentTime),
      },
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedID, setSelectedID] = useState<string>("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.sign === false) {
      toast("You must read and acknowledge the precautions");
      return;
    }

    const requesterInfo = {
      firstName: requester.firstName,
      lastName: requester.lastName,
      email: requester.email,
    };

    const visitorInfo = {
      firstName: values.visitor_first_name,
      lastName: values.visitor_last_name,
      email: values.visitor_email,
      visitLocation: values.visitor_visit_location,
      phoneNumber: values.visitor_phone_number,
      company: values.visitor_company,
    };

    const visitInfo = {
      durationStart: new Date(
        values.duration_of_visit.start.year,
        values.duration_of_visit.start.month - 1,
        values.duration_of_visit.start.day
      ),
      durationEnd: new Date(
        values.duration_of_visit.end.year,
        values.duration_of_visit.end.month - 1,
        values.duration_of_visit.end.day
      ),
      purpose: values.purpose_of_visit,
      visitPersonName: values.info_person_visit_name,
      visitPersonEmail: values.info_person_email,
      visitPersonDepartment: values.info_person_department,
    };

    const response = await fetch("/api/save-request-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterInfo: requesterInfo,
        visitorInfo: visitorInfo,
        visitInfo: visitInfo,
        precautionsAcknowledged: values.sign,
      }),
    });

    if (response.ok) {
      form.reset({
        visitor_email: "",
        visitor_phone_number: "",
        visitor_company: "",

        visitor_visit_location: "",

        purpose_of_visit: "",
        info_person_visit_name: "",
        info_person_department: "",
      });
      toast("Successfully submitted the application");
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailTo: visitInfo.visitPersonEmail,
          subject:
            "[NO REPLY] [Access Control Authorization System] Visitor Notification",
          text: `Hello,\n\nThis is to inform you that ${visitorInfo.firstName} ${visitorInfo.lastName}, from ${visitorInfo.company}, has arrived at the reception and is here for a scheduled visit.\nThank you, and have a great day!\n\nBest,\nUltium CAM`,
        }),
      });

      if (emailResponse.ok) {
      } else {
        toast("Failed to send an email");
      }
    } else {
      // console.error("Failed to submit form:", response.statusText);
      toast("Failed to submit the application");
    }
  }

  return (
    <div>
      <div className="border w-full p-2 rounded-lg mb-3">
        <div className="grid">
          <Label className="flex text-md font-bold">
            <IoWarning className="mr-1 mt-1" />
            Important Notes for Entering the Company Premises
          </Label>
          <div className="grid space-y-1">
            <Label>
              - Please ensure that the seal is attached to your phone’s camera
              before entering the premises.
            </Label>
            <Label>
              - Various storage/recording devices and IT equipment are
              restricted from being brought into the premises. (Please store
              them at the information center or place them in a security
              envelope before entry.)
            </Label>
            <Label>
              - Avoid attempting to enter areas outside of the approved access
              zones or wandering around the company premises.
            </Label>
            <Label>
              - Please return the issued visitor card on the same day.
            </Label>
          </div>
        </div>
      </div>
      <div className="border p-3 w-full mt-2 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="rounded-lg border p-4">
              <div className="flex w-full">
                <Label className="w-40">Visiting Location *</Label>
                <FormField
                  control={form.control}
                  name="visitor_visit_location"
                  render={({ field }) => (
                    <FormItem className="w-full flex ml-3">
                      <FormControl>
                        <RadioGroup
                          // onValueChange={field.onChange}
                          // defaultValue={field.value}
                          onValueChange={(value) => {
                            field.onChange(value); // Update the form value
                            setSelectedLocation(value); // Update the state
                          }}
                          defaultValue={field.value}
                          className="flex"
                        >
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="CAM1 Factory" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              CAM1 Factory
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Office Building" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Office Building
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Other" />
                            </FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                {selectedLocation === "Other" && (
                  <FormField
                    control={form.control}
                    name="visitor_visit_location"
                    render={({ field }) => (
                      <FormItem className="mt-4 w-full flex">
                        <FormLabel className="w-40 mt-5">
                          Please specify *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="Enter location"
                            className="border rounded-md w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <div>
                <Label>Visitor Information *</Label>
                <div className="flex w-full mt-3 gap-3">
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="visitor_first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Visitor First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="visitor_last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Visitor Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="visitor_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Visitor Email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="visitor_phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Visitor Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="visitor_company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Visitor Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-2 border p-4 rounded-lg">
                  <div className="flex w-full">
                    <Label className="w-8">ID *</Label>
                    <FormField
                      control={form.control}
                      name="id_info"
                      render={({ field }) => (
                        <FormItem className="w-full flex ml-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value); // Update the form value
                                setSelectedID(value); // Update the state
                              }}
                              defaultValue={field.value}
                              className="flex"
                            >
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="driver licence" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Driver Licence
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="quebec public health insurance card" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Quebec Public Health Insurance Card
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="passport" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Passport
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="governmental card" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Other Governmental Card
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="Other" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Other
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    {selectedID === "Other" && (
                      <FormField
                        control={form.control}
                        name="id_info"
                        render={({ field }) => (
                          <FormItem className="mt-4 w-full flex">
                            <FormLabel className="w-40 mt-5">
                              Please specify *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                {...field}
                                placeholder="please specify the ID"
                                className="border rounded-md w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <div>
                <Label>Duration/Purpose of Visit *</Label>
              </div>
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="duration_of_visit"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DateRangePicker
                            label="Duration of visit"
                            labelPlacement="outside"
                            variant="bordered"
                            radius="sm"
                            value={field.value}
                            onChange={field.onChange}
                            className="font-medium mt-1.5"
                            defaultValue={{
                              start: parseZonedDateTime(formattedCurrentTime),
                              end: parseZonedDateTime(formattedCurrentTime),
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="purpose_of_visit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose of Visit</FormLabel>
                        <FormControl>
                          <Input placeholder="Purpose of visit" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div>
                <Label>Information of the Person to Visit *</Label>
              </div>
              <div className="flex w-full gap-3">
                <div className="w-1/3">
                  <FormField
                    control={form.control}
                    name="info_person_visit_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/3">
                  <FormField
                    control={form.control}
                    name="info_person_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/3">
                  <FormField
                    control={form.control}
                    name="info_person_department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Department" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end gap-2">
              <FormField
                control={form.control}
                name="sign"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="-mt-0.5">
                <Label>
                  I have read and fully understood all the precautions
                </Label>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
