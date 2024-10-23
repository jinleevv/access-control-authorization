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
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DatePicker, DateRangePicker } from "@nextui-org/date-picker";
import { IoWarning } from "react-icons/io5";

interface RequestFormProps {
  requester: any;
}

let formSchema = z.object({
  visitor_full_name: z.string().min(1).max(50),
  visitor_email: z.string().min(1).max(100),
  visitor_birth_date: z.any(),
  visitor_nationality: z.string().min(1).max(50),
  visitor_phone_number: z.string().min(1).max(50),
  visitor_company: z.string().min(1).max(50),
  visitor_position: z.string().min(1).max(50),

  visitor_visit_location: z.string(),

  duration_of_visit: z.any(),
  purpose_of_visit: z.string().min(1).max(50),
  info_person_visit_name: z.string().min(1).max(50),
  info_person_phone_number: z.string().min(1).max(50),
  info_person_email: z.string().min(1).max(50),
  info_person_department: z.string().min(1).max(50),
});

export function RequestForm({ requester }: RequestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const requesterDateOfBirth = `${requester.dateOfBirth}`;
  const formattedDate = format(
    new Date(requesterDateOfBirth.slice(0, 19)),
    "MMMM do, yyyy"
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [datePart] = requester.dateOfBirth.split("T");
    const [year, month, day] = datePart.split("-").map(Number);

    // Create a new Date object (months are zero-based in the Date constructor)
    const requesterDateOfBirth = new Date(year, month - 1, day);

    const requesterInfo = {
      firstName: requester.firstName,
      lastName: requester.lastName,
      dateOfBirth: requesterDateOfBirth,
      phoneNumber: requester.phoneNumber,
      company: requester.company,
      email: requester.email,
    };

    let usage = true;

    const visitorInfo = {
      fullName: values.visitor_full_name,
      email: values.visitor_email,
      visitLocation: values.visitor_visit_location,
      vehicalUsage: usage,
      dateOfBirth: new Date(
        values.visitor_birth_date.year,
        values.visitor_birth_date.month - 1,
        values.visitor_birth_date.day
      ),
      nationality: values.visitor_nationality,
      phoneNumber: values.visitor_phone_number,
      company: values.visitor_company,
      position: values.visitor_position,
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
      infoPersonVisitEmail: values.info_person_email,
      visitPersonPhoneNumber: values.info_person_phone_number,
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
      }),
    });

    if (response.ok) {
      form.reset({
        visitor_full_name: "",
        visitor_email: "",
        visitor_nationality: "",
        visitor_phone_number: "",
        visitor_company: "",
        visitor_position: "",

        visitor_visit_location: "",

        purpose_of_visit: "",
        info_person_visit_name: "",
        info_person_phone_number: "",
        info_person_department: "",
      });
      toast("Successfully submitted the application");
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailTo: visitInfo.infoPersonVisitEmail,
          subject:
            "[NO REPLY] [Access Control Authorization System] Approval Request for Personnel Entry Application",
          text: `Hello,\n\nYou received one pending personnel entry approval request from ${requesterInfo.firstName} ${requesterInfo.lastName}\nPlease review the request as soon as possible.\n\nBest,\nUltium CAM`,
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
            사내 출입 시 주의사항
          </Label>
          <div className="grid space-y-1">
            <Label>
              - 사업장 진입 전 휴대폰 카메라 봉인지 부착해 주시기 바랍니다.
            </Label>
            <Label>
              - 각종 저장/촬영매체/IT기기는 사업장 내 반입이
              제한됩니다.(안내센테 보관 또는 보안봉투에 담아 진입)
            </Label>
            <Label>
              - 출입신청지역 외 출입시도 및 사내 배회를 자제해 주시기 바랍니다.
            </Label>
            <Label>- 발급받은 방문카드는 당일 반납해주시기 바랍니다.</Label>
          </div>
        </div>
      </div>
      <div className="border p-3 w-full mt-2 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-2 rounded-lg border p-4">
              <div>
                <Label>Visitor Information *</Label>
                <div className="flex w-full mt-3 gap-3">
                  <div className="w-1/6">
                    <FormField
                      control={form.control}
                      name="visitor_full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Visitor Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/5">
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
                  <div className="w-1/5">
                    <FormField
                      control={form.control}
                      name="visitor_birth_date"
                      render={({ field }) => (
                        <FormItem>
                          <div>
                            <DatePicker
                              label="Date of birth"
                              labelPlacement="outside"
                              variant="bordered"
                              className="max-w-full h-12 font-medium mt-1.5"
                              radius="sm"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/5">
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
                  <div className="w-1/5">
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
              </div>
            </div>
            <div className="space-y-2 rounded-lg border p-4">
              <div>
                <Label>Duration/Purpose of Visit *</Label>
              </div>
              <div className="flex w-full gap-3">
                <div className="w-1/2">
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
                <div className="w-1/4">
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
                <div className="w-1/4">
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
                <div className="w-1/4">
                  <FormField
                    control={form.control}
                    name="info_person_phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/4">
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
            <div className="flex w-full justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
