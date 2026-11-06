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
      className="group flex flex-col overflow-hidden rounded-xl border border-foreground/10 transition-shadow hover:shadow-md"
    >
      <div className="flex aspect-video items-center justify-center bg-foreground/5 text-3xl font-bold text-foreground/30">
        {host.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="truncate font-semibold group-hover:underline">
          {link.title}
        </h3>
        <p className="line-clamp-2 text-sm text-foreground/60">
          {link.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-foreground/50">
          <span className="truncate">{host}</span>
          {folderName && (
            <span className="ml-2 shrink-0 rounded bg-foreground/5 px-1.5 py-0.5">
              {folderName}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
