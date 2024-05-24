"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface menuLinkProps {
  item: {
    title: string;
    path: string;
    icon: JSX.Element;
  };
}

export function MenuLink({ item }: menuLinkProps) {
  const pathName = usePathname();

  return (
    <div className="w-full">
      <Link href={item.path}>
        <Button
          className="flex w-full h-[50px] gap-2 justify-start"
          variant={pathName === item.path ? "default" : "ghost"}
        >
          <span>{item.icon}</span>
          {item.title}
        </Button>
      </Link>
    </div>
  );
}
