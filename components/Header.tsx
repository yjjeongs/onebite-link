import NewFolderButton from "./NewFolderButton";
import NewLinkButton from "./NewLinkButton";

export default function Header() {
  return (
    <header className="nav-blur sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--divider)] px-6">
      <span className="text-[17px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </span>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  );
}
