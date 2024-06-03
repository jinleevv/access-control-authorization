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
import { toast } from "sonner";

const createCompanionSchema = (index: number) => ({
  [`companion_${index}_full_name`]: z.string().min(1, "Full Name is required"),
  [`companion_${index}_birth_date`]: z.date(),
  [`companion_${index}_nationality`]: z.string().optional(),
  [`companion_${index}_phone_number`]: z.string().optional(),
  [`companion_${index}_company`]: z.string().optional(),
  [`companion_${index}_position`]: z.string().optional(),
});

let formSchema = z.object({
  requester_first_name: z.string().min(1).max(50),
  requester_last_name: z.string().min(1).max(50),
  requester_birth_date: z.date({
    required_error: "A date of birth is required.",
  }),
  requester_phone_number: z.string().min(1).max(50),
  requester_company: z.string().min(1).max(50),
  visitor_full_name: z.string().min(1).max(50),
  visitor_birth_date: z.date({
    required_error: "A date of birth is required.",
  }),
  visitor_nationality: z.string().min(1).max(50),
  visitor_phone_number: z.string().min(1).max(50),
  visitor_company: z.string().min(1).max(50),
  visitor_position: z.string().min(1).max(50),
  visitor_vehical_province: z.string().min(1).max(50),
  visitor_vehical_number: z.string().min(1).max(50),
  visitor_vehical_type: z.string().min(1).max(50),
  visitor_vehical_model: z.string().min(1).max(50),
  duration_of_visit: z.string().min(1).max(50),
  purpose_of_visit: z.string().min(1).max(50),
  info_person_visit_name: z.string().min(1).max(50),
  info_person_phone_number: z.string().min(1).max(50),
  info_person_company: z.string().min(1).max(50),
  info_person_department: z.string().min(1).max(50),

  companion_0_full_name: z.string().optional(),
  companion_0_birth_date: z.date().optional(),
  companion_0_nationality: z.string().optional(),
  companion_0_phone_number: z.string().optional(),
  companion_0_company: z.string().optional(),
  companion_0_position: z.string().optional(),
});

export function RequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [companions, setCompanions] = useState([createEmptyCompanion()]);
  const [companions_length, setCompanionsLength] = useState<number>(1);

  function createEmptyCompanion() {
    return {};
  }

  const handleAddCompanion = () => {
    if (companions.length < 8) {
      console.log(companions);
      setCompanions([...companions, createEmptyCompanion()]);
      formSchema = formSchema.extend(createCompanionSchema(companions_length));
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-2 rounded-lg border p-4">
          <Label>Requester Information *</Label>
          <div className="flex w-full gap-3">
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="requester_first_name"
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
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="requester_last_name"
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
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="requester_birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="requester_phone_number"
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
            <div className="w-1/5">
              <FormField
                control={form.control}
                name="requester_company"
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
                  name="visitor_birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                        <Input placeholder="Visitor Nationality" {...field} />
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
                        <Input placeholder="Visitor Phone Number" {...field} />
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
            <div className="mt-3">
              <Label>Vehical Information</Label>
              <div className="flex mt-2 w-full gap-3">
                <div className="w-1/4">
                  <FormField
                    control={form.control}
                    name="visitor_vehical_province"
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
                    name="visitor_vehical_number"
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
                    name="visitor_vehical_type"
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
                    name="visitor_vehical_model"
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
                          <Input placeholder="Companion Full Name" {...field} />
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
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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
                          <Input placeholder="Companion Company" {...field} />
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
                          <Input placeholder="Companion Position" {...field} />
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
                    <FormLabel>Duration of Visit</FormLabel>
                    <FormControl>
                      <Input placeholder="Companion Position" {...field} />
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
                      <Input placeholder="Companion Position" {...field} />
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
                name="info_person_company"
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
        <div className="flex w-full justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
