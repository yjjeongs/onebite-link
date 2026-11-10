"use client";

import { useState } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useFolders } from "./FoldersProvider";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinksProvider";
import type { LinkItem } from "@/lib/mock-data";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links, removeLink } = useLinks();
  const [target, setTarget] = useState<LinkItem | null>(null);
  const { folders } = useFolders();
  const visible = folderId ? links.filter((l) => l.folderId === folderId) : links;

  if (visible.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-[var(--text-sub)]">
        등록된 링크가 없습니다.
      </p>
    );
  }

  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {visible.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folderNames.get(link.folderId)}
          onDelete={() => setTarget(link)}
        />
      ))}
    </div>
    {target && (
      <ConfirmDeleteModal
        title="링크 삭제"
        message={`‘${target.title}’ 링크를 정말 삭제하시겠습니까?`}
        onClose={() => setTarget(null)}
        onConfirm={() => {
          removeLink(target.id);
          setTarget(null);
        }}
      />
    )}
    </>
  );
}
