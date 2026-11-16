"use client";

import { useEffect, useState } from "react";
import { createClient } from "./client";

const supabase = createClient();

// Tracks the signed-in user's id (null when signed out). Token refreshes keep
// the same id, so consumers only re-run when the account actually changes.
export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return userId;
}
