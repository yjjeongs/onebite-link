"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

const inputClass =
  "field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("same") && m.includes("password"))
    return "이전과 다른 비밀번호를 입력해주세요.";
  if (m.includes("password") && (m.includes("least") || m.includes("weak") || m.includes("short")))
    return "비밀번호가 너무 약합니다. 더 길고 복잡하게 설정해주세요.";
  if (m.includes("session") || m.includes("not authenticated"))
    return "링크가 만료되었습니다. 비밀번호 찾기를 다시 진행해주세요.";
  return "비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = password !== "" && confirm !== "" && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await createClient().auth.updateUser({ password });
      if (error) {
        setError(toKoreanError(error.message));
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Toast message={error} onClose={() => setError(null)} />}
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
            새 비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password-confirm" className="text-sm font-medium text-[var(--text)]">
            새 비밀번호 확인
          </label>
          <input
            id="password-confirm"
            type="password"
            autoComplete="new-password"
            placeholder="새 비밀번호를 다시 입력하세요"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-1 rounded-[980px] bg-[var(--accent)] px-5 py-3 text-[17px] text-white disabled:opacity-40"
        >
          비밀번호 재설정
        </button>
      </form>
    </>
  );
}
