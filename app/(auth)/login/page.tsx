import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "한입 링크에 로그인하세요.",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-[28px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </h1>
      <LoginForm />
      <p className="text-center text-[15px]">
        <Link href="/forgot-password" className="text-[var(--text-sub)] hover:underline">
          비밀번호를 잊으셨나요?
        </Link>
      </p>
      <p className="text-center text-[15px] text-[var(--text-sub)]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[var(--accent)] hover:underline">
          회원가입
        </Link>
      </p>
    </>
  );
}
