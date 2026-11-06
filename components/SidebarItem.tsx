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
      className={`item-hover flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[15px] ${
        active
          ? "bg-[var(--badge-bg)] font-semibold text-[var(--text)]"
          : "text-[var(--text)]"
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && (
        <span className="ml-2 text-[13px] text-[var(--text-sub)]">{count}</span>
      )}
    </Link>
  );
}
