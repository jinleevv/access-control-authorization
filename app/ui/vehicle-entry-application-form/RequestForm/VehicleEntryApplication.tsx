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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DateRangePicker } from "@nextui-org/date-picker";
import { IoWarning } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseZonedDateTime } from "@internationalized/date";
import { Checkbox } from "@/components/ui/checkbox";

interface RequestFormProps {
  requester: any;
  signed: boolean;
}

const formSchema = z.object({
  vehicle_information_province: z.string(),
  vehicle_information_number: z.string(),
  vehicle_information_type: z.string(),
  vehicle_information_companions: z.string(),

  driver_information_company: z.string(),
  driver_information_name: z.string(),
  driver_information_email: z.string(),
  driver_information_phone_number: z.string(),

  duration_of_visit: z.any(),

  approval_line: z.string(),
  sign: z.boolean().default(false),
});

export function VehicleEntryApplication({
  requester,
  signed,
}: RequestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.sign === false) {
      toast("You must read and acknowledge the precautions");
      return;
    }
    if (values.duration_of_visit == null) {
      values.duration_of_visit = {
        start: parseZonedDateTime(formattedCurrentTime),
        end: parseZonedDateTime(formattedCurrentTime),
      };
    }

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
      supervisor: values.approval_line,
      email: requester.email,
    };

    const formInformation = {
      vehicleInformationProvince: values.vehicle_information_province,
      vehicleInformationNumber: values.vehicle_information_number,
      vehicleInformationType: values.vehicle_information_type,
      vehicleInformationCompanion: values.vehicle_information_companions,

      driverInformationCompany: values.driver_information_company,
      driverInformationFullName: values.driver_information_name,
      driverInformationEmail: values.driver_information_email,
      driverInformationPhoneNumber: values.driver_information_phone_number,

      durationStart: new Date(
        Date.UTC(
          values.duration_of_visit.start.year,
          values.duration_of_visit.start.month - 1,
          values.duration_of_visit.start.day,
          values.duration_of_visit.start.hour,
          values.duration_of_visit.start.minute,
          values.duration_of_visit.start.second,
          values.duration_of_visit.start.millisecond
        )
      ),
      durationEnd: new Date(
        Date.UTC(
          values.duration_of_visit.end.year,
          values.duration_of_visit.end.month - 1,
          values.duration_of_visit.end.day,
          values.duration_of_visit.end.hour,
          values.duration_of_visit.end.minute,
          values.duration_of_visit.end.second,
          values.duration_of_visit.end.millisecond
        )
      ),
    };

    const response = await fetch("/api/save-vehicle-entry-application-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requesterInfo: requesterInfo,
        formInformation: formInformation,
        pledgeSigned: signed,
      }),
    });

    if (response.ok) {
      form.reset({
        vehicle_information_province: "",
        vehicle_information_number: "",
        vehicle_information_type: "",
        vehicle_information_companions: "",

        driver_information_company: "",
        driver_information_name: "",
        driver_information_email: "",
        driver_information_phone_number: "",

        approval_line: "",
      });
      toast("Successfully submitted the application");
      // const emailResponse = await fetch("/api/send-email", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     emailTo: requesterInfo.supervisor,
      //     subject:
      //       "[NO REPLY] [Access Control Authorization System] Approval Request for Vehicle Entry Application",
      //     text: `Hello,\n\nYou received one pending vehicle entry approval request from ${requesterInfo.firstName} ${requesterInfo.lastName}\nPlease review the request as soon as possible.\n\nBest,\nUltium CAM`,
      //   }),
      // });

      // if (emailResponse.ok) {
      // } else {
      //   toast("Failed to send an email");
      // }
    } else {
      // console.error("Failed to submit form:", response.statusText);
      toast("Failed to submit the application");
    }
  }

  return (
    <div>
      <div className="border w-full h-full p-2 rounded-lg mb-4">
        <div className="grid">
          <Label className="flex text-md font-bold">
            <IoWarning className="mr-1 mt-1" />
            신청 전 주의사항
          </Label>
          <div className="grid space-y-1">
            <Label>
              - 신청서 작성 전에 신청서 옆에 안내사항(보안,안전 준수사항)을 꼭
              필독 바랍니다.
            </Label>
            <Label>
              - 단기출입은 방문객이 1일에서 7일 이하의 업무로 차량이 사내로
              진입하지 않으면 업무가 불가능한 경우 차량 출입 신청이 가능합니다.
            </Label>
            <Label>
              - 운전자 외 동승자는 별도의 &quot;일반방문신청&quot; 후 출입
              가능합니다.
            </Label>
            <Label>
              - 승용차(7인승 이하)의 사내 출입은 통제됨에 따라 일반방문신청 후
              사외 주차장을 이용 해주시기 바랍니다.
            </Label>
            <Label>
              - 운전자가 건물 내 출입필요시 &quot;일반방문신청&quot; 또는
              &quot;일일안전작업허가서&quot; 별도 신청 후 고객안내센터에서
              방문카드를 발급해주시기 바랍니다.
            </Label>
          </div>
        </div>
        <div className="grid mt-2">
          <Label className="flex text-md font-bold">
            <IoWarning className="mr-1 mt-1" />
            사내 출입 시 주의사항
          </Label>
          <div className="grid space-y-1">
            <Label>
              - 각종 저장/촬영매체/IT기기는 사업장 내 반입 시 보안위반에
              해당하여 불이익을 받음으로 안내센터 보관 또는 보안물품 봉투에 담아
              진입하여 주시기 바랍니다.
            </Label>
            <Label>
              - 출입신청지역 외 출입시도 및 사내 배회를 자제해 주시기 바랍니다.
            </Label>
            <Label>
              - 발급받은 방문카드는 당일 출문 시 반납하여 주시기 바랍니다.
            </Label>
            <Label>
              - 보안요원의 안내 및 차량검색에 적극 협조하여 주시기 바랍니다.
            </Label>
          </div>
        </div>
      </div>
      <ScrollArea className="h-[520px]">
        <div className="border w-full h-full p-2 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="border p-4 space-y-2 rounded-lg">
                <Label>Vehicle Information</Label>
                <div className="flex mt-2 w-full gap-3">
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="vehicle_information_province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input placeholder="Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="vehicle_information_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Vehicle Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="vehicle_information_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Vehical</FormLabel>
                          <FormControl>
                            <Input placeholder="Type of Vehical" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="vehicle_information_companions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Companions</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Number of Companions"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="border p-4 space-y-2 rounded-lg">
                <Label>Driver Information</Label>
                <div className="flex mt-2 w-full gap-3">
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="driver_information_company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Province" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="driver_information_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Driver Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="driver_information_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Driver's Email"
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
                      name="driver_information_phone_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Type of Vehical" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="border p-4 w-full rounded-lg">
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
              <div className="border p-4 rounded-lg">
                <FormField
                  control={form.control}
                  name="approval_line"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Line</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Appoval Line" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="skjeong23@ultiumcam.net">
                            Soonki Jeong
                          </SelectItem>
                          <SelectItem value="andre.martel@ultiumcam.net">
                            André Martel
                          </SelectItem>
                          <SelectItem value="reza.mokari@ultiumcam.net">
                            Mohammad Reza Mokari
                          </SelectItem>
                          <SelectItem value="jinwon.lee@ultiumcam.net">
                            Test
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <div className="flex w-full h-full justify-end">
                <Button>Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </div>
  );
}
