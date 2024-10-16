import { PledgeForm } from "./PledgeForm/PledgeForm";
import { RequestForm } from "./RequestForm/PersonnelEntryApplicationForm";

interface ApplicationFormProps {
  requester: any;
}

export function PersonnelEntryApplicationForm({
  requester,
}: ApplicationFormProps) {
  return (
    <div className="grid h-full w-full">
      <RequestForm requester={requester} />
    </div>
  );
}
