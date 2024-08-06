import { Label } from "@/components/ui/label";
import { IoBarChart, IoCreate, IoLibrary } from "react-icons/io5";
import { MenuLink } from "./menuLink/menuLink";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: <IoBarChart />,
  },
  {
    title: "Application Form",
    path: "/request-form",
    icon: <IoCreate />,
  },
  {
    title: "Application Form Status",
    path: "/request-status",
    icon: <IoLibrary />,
  },
  {
    title: "Pending Approvals",
    path: "/pending-approvals",
    icon: <IoLibrary />,
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
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </section>
  );
}
