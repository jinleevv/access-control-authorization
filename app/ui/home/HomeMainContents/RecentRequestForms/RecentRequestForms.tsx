import { Label } from "@/components/ui/label";
import { Request, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Request[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export async function RecentRequestForms() {
  const data = await getData();

  return (
    <>
      <div className="w-full h-full space-y-3">
        <Label className="text-md font-bold">Recent Request Forms</Label>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
