"use client";

import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (name: string) => void;
};

export default function NewFolderModal({ onClose, onSave }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const trimmed = name.trim();

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
        aria-labelledby="new-folder-title"
        onSubmit={(e) => {
          e.preventDefault();
          if (!trimmed) return;
          onSave(trimmed);
          onClose();
        }}
        className="flex w-full max-w-sm flex-col gap-6 rounded-[18px] bg-[var(--bg)] p-6 shadow-xl"
      >
        <h2
          id="new-folder-title"
          className="text-[21px] font-semibold tracking-tight text-[var(--text)]"
        >
          새 폴더
        </h2>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            id="folder-name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]"
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
            disabled={!trimmed}
            className="btn-accent rounded-[980px] bg-[var(--accent)] px-5 py-2 text-[15px] text-white disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
