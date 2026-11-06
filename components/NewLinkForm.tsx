"use client";

import { useState } from "react";
import type { Folder } from "@/lib/mock-data";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");

  return (
    <form
      onSubmit={(e) => {
        // UI only: persistence is not implemented yet
        e.preventDefault();
      }}
      className="flex flex-col gap-6"
    >
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="submit"
        className="btn-accent rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] text-white"
      >
        저장
      </button>
    </form>
  );
}
