"use client";

import { useEffect } from "react";

type Props = { message: string; onClose: () => void };

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  return (
    <div
      role="alert"
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-[980px] bg-[var(--error)] px-5 py-3 text-[15px] text-white shadow-lg"
    >
      {message}
    </div>
  );
}
