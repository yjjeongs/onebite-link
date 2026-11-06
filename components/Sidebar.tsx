import type { Folder } from "@/lib/mock-data";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

export default function Sidebar({
  folders,
  totalCount,
}: {
  folders: Folder[];
  totalCount: number;
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-4 overflow-y-auto border-r border-[var(--divider)] bg-[var(--bg)] p-4 md:flex">
      <SidebarItem label="All" href="/" count={totalCount} />
      <div className="flex flex-col gap-1">
        <h2 className="px-3 text-xs font-semibold tracking-wide text-[var(--text-sub)]">
          폴더
        </h2>
        <FolderList folders={folders} />
      </div>
    </aside>
  );
}
