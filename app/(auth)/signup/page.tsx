import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "한입 링크 계정을 만드세요.",
};

export default function SignupPage() {
  return (
    <>
      <h1 className="text-center text-[28px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </h1>
      <SignupForm />
      <p className="text-center text-[15px] text-[var(--text-sub)]">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          로그인
        </Link>
      </p>
      <p className="text-center text-[13px] text-[var(--text-sub)]">
        <Link href="/privacy" className="hover:underline">
          개인정보 처리방침
        </Link>
      </p>
    </>
  );
}
