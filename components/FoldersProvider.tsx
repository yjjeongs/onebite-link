"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mock-data";

type FoldersContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  removeFolder: (id: string) => void;
};

const FoldersContext = createContext<FoldersContextValue | null>(null);

export function FoldersProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    // UI only: persistence is not implemented yet
    setFolders((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, count: 0 },
    ]);
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <FoldersContext.Provider value={{ folders, addFolder, removeFolder }}>
      {children}
    </FoldersContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FoldersContext);
  if (!ctx) throw new Error("useFolders must be used within FoldersProvider");
  return ctx;
}
