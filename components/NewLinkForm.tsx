"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FolderSelect from "./FolderSelect";
import { useFolders } from "./FoldersProvider";
import LinkUrlInput from "./LinkUrlInput";
import { useLinks } from "./LinksProvider";

type OgData = { title: string; description: string; thumbnail: string | null };

async function fetchOg(url: string): Promise<OgData | null> {
  try {
    const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function NewLinkForm() {
  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (saving) return;
        setSaving(true);
        const og = await fetchOg(url);
        // Fall back to the hostname when Open Graph info can't be fetched
        const host = new URL(url).hostname.replace(/^www\./, "");
        const ok = await addLink({
          url,
          folderId,
          title: og?.title || host,
          description: og?.description ?? "",
          thumbnail: og?.thumbnail ?? undefined,
        });
        if (ok) router.push("/");
        else setSaving(false);
      }}
      className="flex flex-col gap-6"
    >
      <LinkUrlInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <button
        type="submit"
        disabled={saving}
        className="btn-accent rounded-[980px] bg-[var(--accent)] px-6 py-3 text-[17px] text-white disabled:opacity-60"
      >
        {saving ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
