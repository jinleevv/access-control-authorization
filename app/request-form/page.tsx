import { Label } from "@/components/ui/label";
import { RequestForm } from "../ui/request-form/RequestForm/RequestForm";

export default function RequestFormPage({ children }: any) {
  return (
    <section className="w-full h-full">
      <div className="mt-5 ml-10 mr-10">
        <Label className="grid text-2xl font-bold">
          Upload Access Request Form
        </Label>
        <Label className="ml-1">Fill out the access request form</Label>
      </div>
      <div className="mt-12 ml-10 mr-10">
        <RequestForm />
      </div>
    </section>
  );
}
