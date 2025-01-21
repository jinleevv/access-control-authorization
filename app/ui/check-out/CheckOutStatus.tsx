import { CheckOutStatusType, columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

async function getData(): Promise<CheckOutStatusType[]> {
  const personnelEntryForm =
    await prisma.personnelEntryApplicationForm.findMany({
      where: {
        checkOut: null,
      },
      select: {
        id: true,
        visitorFirstName: true,
        visitorLastName: true,
        createdAt: true,
        checkOut: true,
      },
    });
  return personnelEntryForm;
}

export default async function CheckOutPageStatus() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10 h-[800px] 2xl:h-[950px]">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
