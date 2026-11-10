"use client";

import { useState } from "react";
import { useFolders } from "./FoldersProvider";
import NewFolderModal from "./NewFolderModal";

export default function NewFolderButton() {
  const [open, setOpen] = useState(false);
  const { addFolder } = useFolders();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="item-hover inline-flex items-center gap-1 rounded-[980px] border border-[var(--border)] px-4 py-1 text-sm font-normal text-[var(--text)]"
      >
        <span aria-hidden className="text-base leading-none">+</span>
        새 폴더
      </button>
      {open && (
        <NewFolderModal onClose={() => setOpen(false)} onSave={addFolder} />
      )}
    </>
  );
}
