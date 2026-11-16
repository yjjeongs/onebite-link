"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

const inputClass =
  "field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]";

function toKoreanError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials"))
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (m.includes("email not confirmed"))
    return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.";
  if (m.includes("rate limit") || m.includes("too many"))
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.trim() !== "" && password !== "" && !loading;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const { error } = await createClient().auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setError(toKoreanError(error.message));
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const onKakaoLogin = async () => {
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    if (error) setError("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-accent mt-1 rounded-[980px] bg-[var(--accent)] px-5 py-3 text-[17px] text-white disabled:opacity-40"
        >
          로그인
        </button>
        <button
          type="button"
          onClick={onKakaoLogin}
          aria-label="카카오 로그인"
          className="mx-auto -mt-2 block"
        >
          <Image
            src="/kakao_login_large_wide.png"
            alt="카카오 로그인"
            width={300}
            height={45}
          />
        </button>
      </form>
    </>
  );
}
