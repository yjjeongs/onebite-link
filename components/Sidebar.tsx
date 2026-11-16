"use client";

import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useFolders } from "./FoldersProvider";
import { useLinks } from "./LinksProvider";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { folders } = useFolders();
  const { links } = useLinks();
  const foldersWithCount = folders.map((f) => ({
    ...f,
    count: links.filter((l) => l.folderId === f.id).length,
  }));

  const handleLogout = async () => {
    await createClient().auth.signOut();
    // Full reload so client-side folder/link state from this user is discarded.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  };

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-4 overflow-y-auto border-r border-[var(--divider)] bg-[var(--bg)] p-4 md:flex">
      <SidebarItem label="All" href="/" count={links.length} />
      <div className="flex flex-col gap-1">
        <h2 className="px-3 text-xs font-semibold tracking-wide text-[var(--text-sub)]">
          폴더
        </h2>
        <FolderList folders={foldersWithCount} />
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="item-hover mt-auto flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-left text-[15px] text-[var(--text)]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        로그아웃
      </button>
      <Link
        href="/privacy"
        className="px-3 text-xs text-[var(--text-sub)] hover:underline"
      >
        개인정보 처리방침
      </Link>
    </aside>
  );
}
