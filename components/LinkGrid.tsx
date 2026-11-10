"use client";

import { useFolders } from "./FoldersProvider";
import LinkCard from "./LinkCard";
import { useLinks } from "./LinksProvider";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links } = useLinks();
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {visible.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folderNames.get(link.folderId)}
        />
      ))}
    </div>
  );
}
