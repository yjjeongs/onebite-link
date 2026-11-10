import { notFound } from "next/navigation";
import LinkGrid from "@/components/LinkGrid";
import { folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = folders.find((f) => f.id === id);
  if (!folder) notFound();

  return (
  <LinkGrid folderId={folder.id} />
  );
}
