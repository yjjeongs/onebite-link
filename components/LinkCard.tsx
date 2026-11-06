import type { LinkItem } from "@/lib/mock-data";

export default function LinkCard({
  link,
  folderName,
}: {
  link: LinkItem;
  folderName?: string;
}) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex flex-col overflow-hidden rounded-[12px] bg-[var(--card)]"
    >
      <div className="flex aspect-video items-center justify-center bg-[var(--badge-bg)] text-4xl font-semibold tracking-tight text-[var(--text-sub)]">
        {host.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="title-hover truncate text-[19px] font-semibold leading-tight tracking-tight text-[var(--text)]">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-snug text-[var(--text-sub)]">
          {link.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3 text-[13px] text-[var(--text-sub)]">
          <span className="truncate">{host}</span>
          {folderName && (
            <span className="ml-2 shrink-0 rounded-[980px] bg-[var(--badge-bg)] px-3 py-1 text-[13px] text-[var(--text)]">
              {folderName}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
