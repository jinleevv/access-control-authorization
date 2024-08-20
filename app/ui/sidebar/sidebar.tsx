import { Label } from "@/components/ui/label";
import {
  IoAccessibility,
  IoBarChart,
  IoCar,
  IoCreate,
  IoIdCardSharp,
  IoLibrary,
  IoRefresh,
  IoReload,
} from "react-icons/io5";
import { MenuLink } from "./menuLink/menuLink";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { doLogout } from "@/app/actions";

const menuItems = [
  {
    title: "Home",
    path: "/home",
    icon: <IoBarChart />,
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

export default function Sidebar() {
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
      <div className="flex justify-end">
        <form action={doLogout}>
          <button
            className="bg-blue-400 my-2 text-white p-1 rounded"
            type="submit"
          >
            Logout
          </button>
        </form>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </section>
  );
}
