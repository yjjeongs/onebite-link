import LinkGrid from "@/components/LinkGrid";

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return <LinkGrid folderId={id} />;
}
