import LinkGrid from "@/components/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export default function Home() {
  return <LinkGrid links={links} folders={folders} />;
}
