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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DatePicker, DateRangePicker } from "@nextui-org/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
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

  companion_0_full_name: z.string().optional(),
  companion_0_birth_date: z.any(),
  companion_0_nationality: z.string().optional(),
  companion_0_phone_number: z.string().optional(),
  companion_0_company: z.string().optional(),
  companion_0_position: z.string().optional(),

  companion_1_full_name: z.string().optional(),
  companion_1_birth_date: z.any(),
  companion_1_nationality: z.string().optional(),
  companion_1_phone_number: z.string().optional(),
  companion_1_company: z.string().optional(),
  companion_1_position: z.string().optional(),

  companion_2_full_name: z.string().optional(),
  companion_2_birth_date: z.any(),
  companion_2_nationality: z.string().optional(),
  companion_2_phone_number: z.string().optional(),
  companion_2_company: z.string().optional(),
  companion_2_position: z.string().optional(),

  companion_3_full_name: z.string().optional(),
  companion_3_birth_date: z.any(),
  companion_3_nationality: z.string().optional(),
  companion_3_phone_number: z.string().optional(),
  companion_3_company: z.string().optional(),
  companion_3_position: z.string().optional(),

  companion_4_full_name: z.string().optional(),
  companion_4_birth_date: z.any(),
  companion_4_nationality: z.string().optional(),
  companion_4_phone_number: z.string().optional(),
  companion_4_company: z.string().optional(),
  companion_4_position: z.string().optional(),

  companion_5_full_name: z.string().optional(),
  companion_5_birth_date: z.any(),
  companion_5_nationality: z.string().optional(),
  companion_5_phone_number: z.string().optional(),
  companion_5_company: z.string().optional(),
  companion_5_position: z.string().optional(),

  companion_6_full_name: z.string().optional(),
  companion_6_birth_date: z.any(),
  companion_6_nationality: z.string().optional(),
  companion_6_phone_number: z.string().optional(),
  companion_6_company: z.string().optional(),
  companion_6_position: z.string().optional(),

  companion_7_full_name: z.string().optional(),
  companion_7_birth_date: z.any(),
  companion_7_nationality: z.string().optional(),
  companion_7_phone_number: z.string().optional(),
  companion_7_company: z.string().optional(),
  companion_7_position: z.string().optional(),
});

export function RequestForm({ requester }: RequestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [companions, setCompanions] = useState([createEmptyCompanion()]);
  const [companions_length, setCompanionsLength] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const requesterDateOfBirth = `${requester.dateOfBirth}`;
  const formattedDate = format(
    new Date(requesterDateOfBirth.slice(0, 19)),
    "MMMM do, yyyy"
  );

  function createEmptyCompanion() {
    return {};
  }

  const handleAddCompanion = () => {
    if (companions.length < 8) {
      setCompanions([...companions, createEmptyCompanion()]);
      // formSchema = formSchema.extend(createCompanionSchema(companions_length));
      const new_length = companions_length + 1;
      setCompanionsLength(new_length);
    } else {
      toast("You cannot add more than 8 companions.");
    }
  };

  const handleDeleteCompanion = (index: any) => {
    if (companions.length > 1) {
      setCompanions(companions.filter((_, i) => i !== index));
      const new_length = companions_length - 1;
      setCompanionsLength(new_length);
    } else {
      toast("You must have at least one companion.");
    }
  };

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

    const companionInfo = {
      fullName0: values.companion_0_full_name ?? "",
      birthDate0: values.companion_0_birth_date
        ? new Date(
            values.companion_0_birth_date.year,
            values.companion_0_birth_date.month - 1,
            values.companion_0_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality0: values.companion_0_nationality ?? "",
      phoneNumber0: values.companion_0_phone_number ?? "",
      company0: values.companion_0_company ?? "",
      position0: values.companion_0_position ?? "",

      fullName1: values.companion_1_full_name ?? "",
      birthDate1: values.companion_1_birth_date
        ? new Date(
            values.companion_1_birth_date.year,
            values.companion_1_birth_date.month - 1,
            values.companion_1_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality1: values.companion_1_nationality ?? "",
      phoneNumber1: values.companion_1_phone_number ?? "",
      company1: values.companion_1_company ?? "",
      position1: values.companion_1_position ?? "",

      fullName2: values.companion_2_full_name ?? "",
      birthDate2: values.companion_2_birth_date
        ? new Date(
            values.companion_2_birth_date.year,
            values.companion_2_birth_date.month - 1,
            values.companion_2_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality2: values.companion_2_nationality ?? "",
      phoneNumber2: values.companion_2_phone_number ?? "",
      company2: values.companion_2_company ?? "",
      position2: values.companion_2_position ?? "",

      fullName3: values.companion_3_full_name ?? "",
      birthDate3: values.companion_3_birth_date
        ? new Date(
            values.companion_3_birth_date.year,
            values.companion_3_birth_date.month - 1,
            values.companion_3_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality3: values.companion_3_nationality ?? "",
      phoneNumber3: values.companion_3_phone_number ?? "",
      company3: values.companion_3_company ?? "",
      position3: values.companion_3_position ?? "",

      fullName4: values.companion_4_full_name ?? "",
      birthDate4: values.companion_4_birth_date
        ? new Date(
            values.companion_4_birth_date.year,
            values.companion_4_birth_date.month - 1,
            values.companion_4_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality4: values.companion_4_nationality ?? "",
      phoneNumber4: values.companion_4_phone_number ?? "",
      company4: values.companion_4_company ?? "",
      position4: values.companion_4_position ?? "",

      fullName5: values.companion_5_full_name ?? "",
      birthDate5: values.companion_5_birth_date
        ? new Date(
            values.companion_5_birth_date.year,
            values.companion_5_birth_date.month - 1,
            values.companion_5_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality5: values.companion_5_nationality ?? "",
      phoneNumber5: values.companion_5_phone_number ?? "",
      company5: values.companion_5_company ?? "",
      position5: values.companion_5_position ?? "",

      fullName6: values.companion_6_full_name ?? "",
      birthDate6: values.companion_6_birth_date
        ? new Date(
            values.companion_6_birth_date.year,
            values.companion_6_birth_date.month - 1,
            values.companion_6_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality6: values.companion_6_nationality ?? "",
      phoneNumber6: values.companion_6_phone_number ?? "",
      company6: values.companion_6_company ?? "",
      position6: values.companion_6_position ?? "",

      fullName7: values.companion_7_full_name ?? "",
      birthDate7: values.companion_7_birth_date
        ? new Date(
            values.companion_7_birth_date.year,
            values.companion_7_birth_date.month - 1,
            values.companion_7_birth_date.day
          )
        : new Date(), // Default to the current date if no value is provided
      nationality7: values.companion_7_nationality ?? "",
      phoneNumber7: values.companion_7_phone_number ?? "",
      company7: values.companion_7_company ?? "",
      position7: values.companion_7_position ?? "",
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
        companionInfo: companionInfo,
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

        companion_0_full_name: "",
        companion_0_nationality: "",
        companion_0_phone_number: "",
        companion_0_company: "",
        companion_0_position: "",

        companion_1_full_name: "",
        companion_1_nationality: "",
        companion_1_phone_number: "",
        companion_1_company: "",
        companion_1_position: "",

        companion_2_full_name: "",
        companion_2_nationality: "",
        companion_2_phone_number: "",
        companion_2_company: "",
        companion_2_position: "",

        companion_3_full_name: "",
        companion_3_nationality: "",
        companion_3_phone_number: "",
        companion_3_company: "",
        companion_3_position: "",

        companion_4_full_name: "",
        companion_4_nationality: "",
        companion_4_phone_number: "",
        companion_4_company: "",
        companion_4_position: "",

        companion_5_full_name: "",
        companion_5_nationality: "",
        companion_5_phone_number: "",
        companion_5_company: "",
        companion_5_position: "",

        companion_6_full_name: "",
        companion_6_nationality: "",
        companion_6_phone_number: "",
        companion_6_company: "",
        companion_6_position: "",

        companion_7_full_name: "",
        companion_7_nationality: "",
        companion_7_phone_number: "",
        companion_7_company: "",
        companion_7_position: "",
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
      <ScrollArea className="border p-3 w-full h-[660px] mt-2 2xl:h-[780px] rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="border p-4 space-y-2 rounded-lg">
              <Label>Requester Information *</Label>
              <div className="flex w-full gap-3">
                <div className="space-y-2 w-1/5">
                  <Label>First Name</Label>
                  <Input
                    placeholder="First Name"
                    value={requester.firstName}
                    disabled
                  />
                </div>
                <div className="space-y-2 w-1/5">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last Name"
                    value={requester.lastName}
                    disabled
                  />
                </div>
                <div className="space-y-2 w-1/5">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !new Date(requesterDateOfBirth) &&
                              "text-muted-foreground"
                          )}
                          disabled
                        >
                          <span>{formattedDate}</span>
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        selected={new Date(requester.dateOfBirth)}
                        disabled
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2 w-1/5">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="Phone Number"
                    value={requester.phoneNumber}
                    disabled
                  />
                </div>
                <div className="space-y-2 w-1/5">
                  <Label>Company</Label>
                  <Input
                    placeholder="Company"
                    value={requester.company}
                    disabled
                  />
                </div>
              </div>
            </div>
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
                  <div className="w-1/6">
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
                  <div className="w-1/6">
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
                  <div className="w-1/6">
                    <FormField
                      control={form.control}
                      name="visitor_nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Visitor Nationality"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/6">
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
                  <div className="w-1/6">
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
                  <div className="w-1/6">
                    <FormField
                      control={form.control}
                      name="visitor_position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Visitor Position" {...field} />
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
              <div className="flex w-full justify-between">
                <Label>Companion Information</Label>
                <div className="flex gap-1">
                  <Button size="sm" type="button" onClick={handleAddCompanion}>
                    Add
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => handleDeleteCompanion(companions.length - 1)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              {companions.map((companion, index) => {
                const full_name = `companion_${index}_full_name`;
                const date_of_birth = `companion_${index}_birth_date`;
                const nationality = `companion_${index}_nationality`;
                const phone_number = `companion_${index}_phone_number`;
                const company = `companion_${index}_company`;
                const position = `companion_${index}_position`;

                return (
                  <div className="flex w-full gap-3" key={index}>
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={full_name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Companion Full Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={date_of_birth}
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
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={nationality}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Companion Nationality"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={phone_number}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Companion Phone Number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={company}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Companion Company"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-1/6">
                      <FormField
                        control={form.control}
                        name={position}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Companion Position"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
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
      </ScrollArea>
    </div>
  );
}
