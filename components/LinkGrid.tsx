import type { Folder, LinkItem } from "@/lib/mock-data";
import LinkCard from "./LinkCard";

export default function LinkGrid({
  links,
  folders,
}: {
  links: LinkItem[];
  folders: Folder[];
}) {
  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-foreground/50">
        등록된 링크가 없습니다.
      </p>
    );
  }

  const folderNames = new Map(folders.map((f) => [f.id, f.name]));

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          folderName={folderNames.get(link.folderId)}
        />
      ))}
    </div>
  );
}
