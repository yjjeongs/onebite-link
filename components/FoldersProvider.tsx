"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Folder } from "@/lib/mock-data";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => Promise<boolean>;
  renameFolder: (id: string, name: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    supabase
      .from("folder")
      .select("id, name")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setFolders(
          (data ?? []).map((row) => ({ id: String(row.id), name: row.name, count: 0 })),
        );
      });
  }, []);

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
