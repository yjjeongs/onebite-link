"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/mock-data";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import NewFolderModal from "./NewFolderModal";
import { useFolders } from "./FoldersProvider";
import SidebarItem from "./SidebarItem";

export default function FolderList({ folders }: { folders: Folder[] }) {
  const { removeFolder, renameFolder } = useFolders();
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const [target, setTarget] = useState<Folder | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const confirmDelete = async () => {
    if (!target) return;
    const wasViewing = pathname === `/folder/${target.id}`;
    const ok = await removeFolder(target.id);
    setTarget(null);
    if (ok && wasViewing) router.push("/");
  };

  return (
    <>
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id} className="group relative">
            <SidebarItem
              label={folder.name}
              href={`/folder/${folder.id}`}
              count={folder.count}
            />
            <button
              type="button"
              aria-label={`${folder.name} 폴더 이름 수정`}
              onClick={() => setEditTarget(folder)}
              className="absolute right-16 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-sub)] opacity-0 transition-opacity hover:text-[var(--accent)] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`${folder.name} 폴더 삭제`}
              onClick={() => setTarget(folder)}
              className="absolute right-9 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[var(--text-sub)] opacity-0 transition-opacity hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 6h18" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      {editTarget && (
        <NewFolderModal
          key={editTarget.id}
          title="폴더 이름 수정"
          initialName={editTarget.name}
          onClose={() => setEditTarget(null)}
          onSave={(name) => renameFolder(editTarget.id, name)}
        />
      )}
      {target && (
        <ConfirmDeleteModal
          title="폴더 삭제"
          message={`‘${target.name}’ 폴더를 정말 삭제하시겠습니까?`}
          onClose={() => setTarget(null)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
}
