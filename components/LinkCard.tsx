"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/mock-data";

export default function LinkCard({
  link,
  folderName,
  onEdit,
  onDelete,
}: {
  link: LinkItem;
  folderName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <div className="card-hover group relative flex flex-col overflow-hidden rounded-[12px] bg-[var(--card)]">
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 flex-col"
    >
      <div className="flex aspect-video items-center justify-center overflow-hidden bg-[var(--badge-bg)] text-4xl font-semibold tracking-tight text-[var(--text-sub)]">
        {link.thumbnail && !imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary external hosts
          <img
            src={link.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          host.charAt(0).toUpperCase()
        )}
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
    {onEdit && (
      <button
        type="button"
        aria-label={`${link.title} 링크 수정`}
        onClick={onEdit}
        className="absolute right-12 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)]/90 text-[var(--text-sub)] opacity-0 shadow-sm transition-opacity hover:text-[var(--accent)] focus-visible:opacity-100 group-hover:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
    )}
    {onDelete && (
      <button
        type="button"
        aria-label={`${link.title} 링크 삭제`}
        onClick={onDelete}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)]/90 text-[var(--text-sub)] opacity-0 shadow-sm transition-opacity hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
    )}
    </div>
  );
}
