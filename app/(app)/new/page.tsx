import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <h1 className="mb-6 text-xl font-bold">새 링크 추가</h1>
      <NewLinkForm folders={folders} />
    </div>
  );
}
