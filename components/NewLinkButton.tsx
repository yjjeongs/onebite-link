import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-accent inline-flex items-center gap-1 rounded-[980px] bg-[var(--accent)] px-4 py-1 text-sm font-normal text-white"
    >
      <span aria-hidden className="text-base leading-none">+</span>
      새 링크
    </Link>
  );
}
