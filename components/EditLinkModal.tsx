"use client";

import { useEffect, useState } from "react";
import type { Folder, LinkItem } from "@/lib/mock-data";
import FolderSelect from "./FolderSelect";

type Values = Pick<LinkItem, "folderId" | "title" | "description">;

type Props = {
  link: LinkItem;
  folders: Folder[];
  onClose: () => void;
  onSave: (values: Values) => void;
};

export default function EditLinkModal({ link, folders, onClose, onSave }: Props) {
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const trimmedTitle = title.trim();
  const fieldClass =
    "field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-link-title"
        onSubmit={(e) => {
          e.preventDefault();
          if (!trimmedTitle) return;
          onSave({ folderId, title: trimmedTitle, description: description.trim() });
          onClose();
        }}
        className="flex w-full max-w-md flex-col gap-5 rounded-[18px] bg-[var(--bg)] p-6 shadow-xl"
      >
        <h2
          id="edit-link-title"
          className="text-[21px] font-semibold tracking-tight text-[var(--text)]"
        >
          링크 수정
        </h2>
        <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="link-title" className="text-sm font-medium text-[var(--text)]">
            제목
          </label>
          <input
            id="link-title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="link-description" className="text-sm font-medium text-[var(--text)]">
            설명
          </label>
          <textarea
            id="link-description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${fieldClass} resize-none`}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="item-hover rounded-[980px] px-5 py-2 text-[15px] text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!trimmedTitle}
            className="btn-accent rounded-[980px] bg-[var(--accent)] px-5 py-2 text-[15px] text-white disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
