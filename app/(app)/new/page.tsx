import NewLinkForm from "@/components/NewLinkForm";

export default function NewLinkPage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <h1 className="mb-12 text-[40px] font-semibold leading-[1.1] tracking-[-0.5px] text-[var(--text)]">새 링크 추가</h1>
      <NewLinkForm />
    </div>
  );
}
