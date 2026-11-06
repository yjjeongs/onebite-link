import { notFound } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = folders.find((f) => f.id === id);
  if (!folder) notFound();

  return (
    <LinkGrid
      links={links.filter((link) => link.folderId === folder.id)}
      folders={folders}
    />
  );
}
