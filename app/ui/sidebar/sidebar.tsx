import { Label } from "@/components/ui/label";
import {
  IoCar,
  IoHome,
  IoIdCardSharp,
  IoLibrary,
  IoLogOut,
  IoPersonCircle,
  IoReload,
} from "react-icons/io5";
import { MenuLink } from "./menuLink/menuLink";
import { Button } from "@/components/ui/button";
import { doLogout } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const menuItems = [
  {
    title: "Home",
    path: "/home",
    icon: <IoHome />,
  },
  {
    title: "Personnel Entry Application Form",
    path: "/personnel-entry-application-form",
    icon: <IoIdCardSharp />,
  },
  {
    title: "Vehicle Entry Application Form",
    path: "/vehicle-entry-application-form",
    icon: <IoCar />,
  },
  {
    title: "Application Form Status",
    path: "/request-status",
    icon: <IoLibrary />,
  },
  {
    title: "Pending Approvals",
    path: "/pending-approvals",
    icon: <IoReload />,
  },
];

interface userInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export default async function Sidebar() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const userSession: userInfo = session.user;

  const myFullName = userSession.firstName + " " + userSession.lastName;
  const myDepartment = userSession.email;

  return (
    <section className="sticky left-0 top-0 flex h-screen flex-col justify-between border-r border-gray-200 pt-8 max-md:hidden">
      <nav>
        <div className="grid text-center">
          <Label className="text-black text-2xl font-bold">Ultium CAM</Label>
          <Label className="text-black text-xs mb-7">
            Access Control Authorization System
          </Label>
        </div>
        <div className="w-full p-3 space-y-2">
          {menuItems.map((item) => {
            return <MenuLink item={item} key={item.path} />;
          })}
        </div>
        <div className="w-full border-t-1.5"></div>
      </nav>

      <div className="flex w-full border-t-1">
        <div className="m-auto">
          <IoPersonCircle size={35} />
        </div>
        <div className="grid space-y-1.5 mt-auto mb-auto">
          <Label className="font-bold">{myFullName},</Label>
          <Label className="text-xs">{myDepartment}</Label>
        </div>
        <div className="p-2 ml-auto mb-auto mr-auto">
          <form action={doLogout}>
            <Button variant="ghost">
              <IoLogOut />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
