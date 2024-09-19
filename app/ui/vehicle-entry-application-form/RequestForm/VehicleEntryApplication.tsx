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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { DateRangePicker } from "@nextui-org/date-picker";
import { IoWarning } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RequestFormProps {
  requester: any;
  signed: boolean;
}

const formSchema = z.object({
  application_type: z.string(),
  purpose: z.string(),

  vehicle_information_province: z.string(),
  vehicle_information_number: z.string(),
  vehicle_information_type: z.string(),
  vehicle_information_model: z.string(),

  driver_information_company: z.string(),
  driver_information_name: z.string(),
  driver_information_phone_number: z.string(),
  driver_information_position: z.string(),

  duration_of_visit: z.any(),

  approval_line: z.string(),
});

export function VehicleEntryApplication({
  requester,
  signed,
}: RequestFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

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
      supervisor: values.approval_line,
      email: requester.email,
    };

    const formInformation = {
      applicationType: values.application_type,

      purpose: values.purpose,

      vehicleInformationProvince: values.vehicle_information_province,
      vehicleInformationNumber: values.vehicle_information_number,
      vehicleInformationType: values.vehicle_information_type,
      vehicleInformationModel: values.vehicle_information_model,

      driverInformationCompany: values.driver_information_company,
      driverInformationFullName: values.driver_information_name,
      driverInformationPhoneNumber: values.driver_information_phone_number,
      driverInformationPosition: values.driver_information_position,

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
      toast("Successfully submitted the application");
    } else {
      console.error("Failed to submit form:", response.statusText);
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
      <ScrollArea className="h-[500px] 2xl:h-[660px]">
        <div className="border w-full h-full p-4 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <FormField
                  control={form.control}
                  name="application_type"
                  render={({ field }) => (
                    <FormItem className="w-full flex">
                      <FormLabel>Application Type *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex ml-3"
                        >
                          <FormItem className="flex -mt-2 items-center space-x-1.5 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Short-term Access" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Short-term Access
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex -mt-2 items-center space-x-1.5 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Long-term Access" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Long-term Access
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex -mt-2 items-center space-x-1.5 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Emergency Access" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Emergency Access
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="border p-4 rounded-lg">
                <div>
                  <FormField
                    control={form.control}
                    name="purpose"
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
                      name="vehicle_information_model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehical Model</FormLabel>
                          <FormControl>
                            <Input placeholder="Vehical Model" {...field} />
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
                  <div className="w-1/4">
                    <FormField
                      control={form.control}
                      name="driver_information_position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Vehical Model" {...field} />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
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
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
