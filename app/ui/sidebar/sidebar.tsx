import { Label } from "@/components/ui/label";
import {
  IoArrowDownCircleSharp,
  IoCar,
  IoHammer,
  IoHome,
  IoIdCardSharp,
  IoLibrary,
  IoLogOut,
  IoPersonCircle,
  IoReload,
  IoServer,
} from "react-icons/io5";
import { MenuLink } from "./menuLink/menuLink";
import { Button } from "@/components/ui/button";
import { doLogout } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const employeeMenuItems = [
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
];

const ApprovalMenuItems = [
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

const securityMenuItems = [
  {
    title: "Check-Out",
    path: "/check-out",
    icon: <IoHammer />,
  },
  {
    title: "Security Reports",
    path: "/security-reports",
    icon: <IoArrowDownCircleSharp />,
  },
];

const adminMenuItems = [
  {
    title: "Create / Delete Users",
    path: "/user-control",
    icon: <IoHammer />,
  },
  {
    title: "User Database",
    path: "/user-database",
    icon: <IoHammer />,
  },
  {
    title: "Manage Approvals",
    path: "/manage-approvals",
    icon: <IoServer />,
  },
  {
    title: "Export Data",
    path: "/export-data",
    icon: <IoArrowDownCircleSharp />,
  },
];

export default async function Sidebar() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const userSession = session?.user;

  const myFullName = userSession?.firstName + " " + userSession?.lastName;
  const myEmail = userSession?.email;

  return (
    <section className="sticky left-0 top-0 flex h-screen flex-col justify-between border-r border-gray-200 pt-8 max-md:hidden overflow-auto">
      <nav>
        <div className="grid text-center">
          <Label className="text-black text-2xl font-bold">Ultium CAM</Label>
          <Label className="text-black text-xs mb-7">
            Access Control Authorization System
          </Label>
        </div>
        <div className="w-full p-3 space-y-2">
          {employeeMenuItems.map((item) => {
            return <MenuLink item={item} key={item.path} />;
          })}
        </div>

        <div className="border-t-1 w-full p-3 space-y-2">
          {ApprovalMenuItems.map((item) => {
            return <MenuLink item={item} key={item.path} />;
          })}
        </div>

        {userSession.security ||
        userSession.admin ||
        userSession.department === "IT" ? (
          <>
            <div className="w-full border-t-1"></div>
            <div className="w-full p-3 space-y-2">
              {securityMenuItems.map((item) => {
                return <MenuLink item={item} key={item.path} />;
              })}
            </div>
          </>
        ) : (
          <></>
        )}
        {userSession.admin || userSession.department === "IT" ? (
          <>
            <div className="w-full border-t-1"></div>
            <div className="w-full p-3 space-y-2">
              {adminMenuItems.map((item) => {
                return <MenuLink item={item} key={item.path} />;
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </nav>
      <div className="flex w-full border-t-1.5">
        <div className="m-auto">
          <IoPersonCircle size={35} />
        </div>
        <div className="grid space-y-1.5 mt-auto mb-auto">
          <Label className="font-bold">{myFullName},</Label>
          <Label className="text-xs">{myEmail}</Label>
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
