import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Reports() {
  return (
    <section className="space-y-2">
      <div className="flex w-full gap-2">
        <Label className="w-10 m-auto font-bold">Title:</Label>
        <Input className="rounded-lg"></Input>
      </div>
      <div className="flex w-full gap-2">
        <Label className="w-10 m-auto font-bold">To:</Label>
        <Input className="rounded-lg"></Input>
      </div>
      <div className="w-full gap-2">
        <Label className="w-10 m-auto font-bold">Message:</Label>
        <Textarea
          className="rounded-lg h-[400px]"
          placeholder="Type your message here."
        ></Textarea>
      </div>
    </section>
  );
}
