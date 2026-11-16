import type { Metadata } from "next";
import LinkGrid from "@/components/LinkGrid";

export const metadata: Metadata = {
  title: "폴더",
  description: "폴더에 저장된 링크 목록",
};

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return <LinkGrid folderId={id} />;
}
