"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("rate limit") || m.includes("too many") || m.includes("seconds"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  if (m.includes("invalid") && m.includes("email")) return "올바른 이메일 형식이 아닙니다.";
  return "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ForgotPasswordForm({ initialError }: { initialError?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() !== "" && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) {
        setError(toKoreanError(error.message));
        return;
      }
      setSent(true);
    } catch {
      setError("메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Toast message={error} onClose={() => setError(null)} />}
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-1 rounded-[980px] bg-[var(--accent)] px-5 py-3 text-[17px] text-white disabled:opacity-40"
        >
          비밀번호 리셋 링크 발송
        </button>
        {sent && (
          <p className="text-center text-[15px] text-[var(--success)]">
            비밀번호 리셋 링크를 이메일로 발송했습니다. 메일함을 확인해주세요.
          </p>
        )}
      </form>
    </>
  );
}
