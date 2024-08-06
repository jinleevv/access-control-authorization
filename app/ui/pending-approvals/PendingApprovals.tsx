import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";

interface PendingApprovalsProps {
  requester: any;
}

export async function PendingApprovals({ requester }: PendingApprovalsProps) {
  const myFullName = requester.firstName + " " + requester.lastName;

  const matchingForms = await prisma.requestForm.findMany({
    where: {
      supervisor: myFullName,
    },
  });

  return (
    <section className="h-full">
      <div>
        {/* {matchingForms.map((forms) => {
          const data = forms.requesterFirstName;
        })} */}
      </div>
    </section>
  );
}
