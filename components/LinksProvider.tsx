"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { LinkItem } from "@/lib/mock-data";
import { createClient } from "@/utils/supabase/client";
import { useUserId } from "@/utils/supabase/useUserId";

const supabase = createClient();

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  create_at: string;
  folder_id: number | null;
};

const toLinkItem = (row: LinkRow): LinkItem => ({
  id: String(row.id),
  url: row.url,
  title: row.title ?? row.url,
  description: row.description ?? "",
  thumbnail: row.thumbnail_url ?? undefined,
  folderId: row.folder_id === null ? "" : String(row.folder_id),
  createdAt: row.create_at.slice(0, 10),
});

type LinksContextValue = {
  links: LinkItem[];
  removeLink: (id: string) => Promise<boolean>;
  updateLink: (
    id: string,
    values: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => Promise<boolean>;
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => Promise<boolean>;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const userId = useUserId();
  // Data is tagged with its owner so a different account never sees stale rows.
  const [state, setState] = useState<{ owner: string | null; items: LinkItem[] }>({
    owner: null,
    items: [],
  });
  const links = state.owner === userId ? state.items : [];
  const setLinks = (update: (prev: LinkItem[]) => LinkItem[]) =>
    setState((s) => ({ owner: userId, items: update(s.owner === userId ? s.items : []) }));

  // Reload from scratch whenever the signed-in account changes.
  useEffect(() => {
    let cancelled = false;
    if (!userId) return;
    supabase
      .from("link")
      .select("*")
      .eq("user_id", userId)
      .order("create_at", { ascending: false })
      .order("id", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error(error);
          return;
        }
        setState({ owner: userId, items: (data as LinkRow[]).map(toLinkItem) });
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const addLink: LinksContextValue["addLink"] = async (link) => {
    const { data, error } = await supabase
      .from("link")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail ?? null,
        folder_id: link.folderId ? Number(link.folderId) : null,
      })
      .select("*")
      .single();
    if (error) {
      console.error(error);
      return false;
    }
    setLinks((prev) => [toLinkItem(data as LinkRow), ...prev]);
    return true;
  };

  const removeLink = async (id: string) => {
    const { error } = await supabase.from("link").delete().eq("id", Number(id));
    if (error) {
      console.error(error);
      return false;
    }
    setLinks((prev) => prev.filter((l) => l.id !== id));
    return true;
  };

  const updateLink: LinksContextValue["updateLink"] = async (id, values) => {
    const { error } = await supabase
      .from("link")
      .update({
        title: values.title,
        description: values.description,
        folder_id: values.folderId ? Number(values.folderId) : null,
      })
      .eq("id", Number(id));
    if (error) {
      console.error(error);
      return false;
    }
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...values } : l)));
    return true;
  };

  return (
    <LinksContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
