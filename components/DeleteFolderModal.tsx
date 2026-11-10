"use client";

import { useEffect } from "react";

type Props = {
  folderName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({ folderName, onClose, onConfirm }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        className="flex w-full max-w-sm flex-col gap-4 rounded-[18px] bg-[var(--bg)] p-6 shadow-xl"
      >
        <h2
          id="delete-folder-title"
          className="text-[21px] font-semibold tracking-tight text-[var(--text)]"
        >
          폴더 삭제
        </h2>
        <p className="text-[15px] text-[var(--text-sub)]">
          &lsquo;{folderName}&rsquo; 폴더를 정말 삭제하시겠습니까?
        </p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="item-hover rounded-[980px] px-5 py-2 text-[15px] text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-[980px] bg-[var(--error)] px-5 py-2 text-[15px] text-white transition-opacity hover:opacity-85"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
