import type { Folder } from "@/lib/mock-data";
import SidebarItem from "./SidebarItem";

export default function FolderList({ folders }: { folders: Folder[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {folders.map((folder) => (
        <li key={folder.id}>
          <SidebarItem label={folder.name}
            href={`/folder/${folder.id}`}
            count={folder.count} />
        </li>
      ))}
    </ul>
  );
}
