import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-[28px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </h1>
      <LoginForm />
      <p className="text-center text-[15px] text-[var(--text-sub)]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[var(--accent)] hover:underline">
          회원가입
        </Link>
      </p>
    </>
  );
}
