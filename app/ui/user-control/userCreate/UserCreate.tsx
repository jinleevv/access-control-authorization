"use client";

import { Label } from "@/components/ui/label";
import { date, z } from "zod";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@nextui-org/date-picker";

const formSchema = z.object({
  admin: z.boolean().optional(),
  first_name: z
    .string({ required_error: "First name is required" })
    .min(1, "First name is required"),
  last_name: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  verify_password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  date_of_birth: z.any(),
  phone_number: z.string(),
  company: z.string(),
});

export default function UserCreate() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      verify_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.verify_password) {
      toast("Password does not match with each other");
      return;
    }

    const dateOfBirth = new Date(
      values.date_of_birth.year,
      values.date_of_birth.month - 1,
      values.date_of_birth.day
    );

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin: values.admin,
          email: values.email,
          password: values.password,
          firstName: values.first_name.toUpperCase(),
          lastName: values.last_name.toUpperCase(),
          dateOfBirth: dateOfBirth,
          phoneNumber: values.phone_number,
          company: values.company,
        }),
      });
      if (!response) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      form.reset({
        admin: false,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        verify_password: "",
        phone_number: "",
        company: "",
      });
      toast("Registration Successful");
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast("Registration Failed");
    }
  }

  return (
    <div className="w-full h-full">
      <div className="ml-10 mr-10">
        <Label className="grid text-lg font-bold">Create a User</Label>
      </div>
      <div className="mt-2 ml-10 mr-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="admin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="w-full h-full ml-1 -mt-3">
                    Admin
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-3">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@ultiumcam.net"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
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
                  name="verify_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verify Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex w-full gap-3">
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="date_of_birth"
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
                    // <FormItem>
                    //   <FormLabel>Date of birth</FormLabel>
                    //   <Popover>
                    //     <PopoverTrigger asChild>
                    //       <FormControl>
                    //         <Button
                    //           variant={"outline"}
                    //           className={cn(
                    //             "w-full text-left font-normal",
                    //             !field.value && "text-muted-foreground"
                    //           )}
                    //         >
                    //           {field.value ? (
                    //             format(field.value, "PPP")
                    //           ) : (
                    //             <span>Pick a date</span>
                    //           )}
                    //           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    //         </Button>
                    //       </FormControl>
                    //     </PopoverTrigger>
                    //     <PopoverContent className="w-auto p-0" align="start">
                    //       <Calendar
                    //         mode="single"
                    //         selected={field.value}
                    //         onSelect={field.onChange}
                    //         disabled={(date) =>
                    //           date > new Date() || date < new Date("1900-01-01")
                    //         }
                    //         initialFocus
                    //       />
                    //     </PopoverContent>
                    //   </Popover>
                    //   <FormMessage />
                    // </FormItem>
                  )}
                />
              </div>
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="phone_number"
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
              <div className="w-1/3">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
