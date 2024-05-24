import { Label } from "@/components/ui/label";
import { IoBarChart, IoCreate, IoLibrary } from "react-icons/io5";
import { MenuLink } from "./menuLink/menuLink";

const menuItems = [
  {
    title: "Home",
    path: "/",
    icon: <IoBarChart />,
  },
  {
    title: "Request Form",
    path: "/request-form",
    icon: <IoCreate />,
  },
  {
    title: "Request Status",
    path: "/request-status",
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
        <div className="w-full h-full p-3 space-y-2">
          {menuItems.map((item) => {
            return <MenuLink item={item} key={item.path} />;
          })}
        </div>
      </nav>
      <div className="flex justify-end">hi</div>
    </section>
  );
}
