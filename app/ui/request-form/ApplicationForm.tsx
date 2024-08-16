import { PledgeForm } from "./PledgeForm/PledgeForm";

interface ApplicationFormProps {
  requester: any;
}

export function ApplicationForm({ requester }: ApplicationFormProps) {
  return (
    <div className="h-full w-full">
      <PledgeForm requester={requester} />
    </div>
  );
}
