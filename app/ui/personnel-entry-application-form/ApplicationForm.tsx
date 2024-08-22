import { PledgeForm } from "./PledgeForm/PledgeForm";

interface ApplicationFormProps {
  requester: any;
}

export function PersonnelEntryApplicationForm({
  requester,
}: ApplicationFormProps) {
  return (
    <div className="grid h-full w-full">
      <PledgeForm requester={requester} />
    </div>
  );
}
