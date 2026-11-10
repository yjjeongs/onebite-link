"use client";

import { createContext, useContext, useState } from "react";
import { links as initialLinks, type LinkItem } from "@/lib/mock-data";

type LinksContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id" | "createdAt">) => void;
};

const LinksContext = createContext<LinksContextValue | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink: LinksContextValue["addLink"] = (link) => {
    // UI only: persistence is not implemented yet
    setLinks((prev) => [
      {
        ...link,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  return (
    <LinksContext.Provider value={{ links, addLink }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within LinksProvider");
  return ctx;
}
