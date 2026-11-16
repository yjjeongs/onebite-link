"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Folder } from "@/lib/mock-data";
import { createClient } from "@/utils/supabase/client";
import { useUserId } from "@/utils/supabase/useUserId";

const supabase = createClient();

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<boolean>;
  renameFolder: (id: string, name: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const userId = useUserId();
  // Data is tagged with its owner so a different account never sees stale rows.
  const [state, setState] = useState<{ owner: string | null; items: Folder[] }>({
    owner: null,
    items: [],
  });
  const folders = state.owner === userId ? state.items : [];
  const setFolders = (update: (prev: Folder[]) => Folder[]) =>
    setState((s) => ({ owner: userId, items: update(s.owner === userId ? s.items : []) }));

  // Reload from scratch whenever the signed-in account changes.
  useEffect(() => {
    let cancelled = false;
    if (!userId) return;
    supabase
      .from("folder")
      .select("id, name")
      .eq("user_id", userId)
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error(error);
          return;
        }
        setState({
          owner: userId,
          items: (data ?? []).map((row) => ({
            id: String(row.id),
            name: row.name,
            count: 0,
          })),
        });
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const addFolder = async (name: string) => {
    const { data, error } = await supabase
      .from("folder")
      .insert({ name })
      .select("id, name")
      .single();
    if (error) {
      console.error(error);
      return;
    }
    setFolders((prev) => [
      ...prev,
      { id: String(data.id), name: data.name, count: 0 },
    ]);
  };

  const removeFolder = async (id: string) => {
    const { error } = await supabase.from("folder").delete().eq("id", Number(id));
    if (error) {
      console.error(error);
      return false;
    }
    setFolders((prev) => prev.filter((f) => f.id !== id));
    return true;
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, removeFolder, renameFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
