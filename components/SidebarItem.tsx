"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href: string;
  count?: number;
};

export default function SidebarItem({ label, href, count }: Props) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active
          ? "bg-foreground/10 font-semibold"
          : "text-foreground/70 hover:bg-foreground/5"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-2 text-xs text-foreground/50">{count}</span>
      )}
    </Link>
  );
}
