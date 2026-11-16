import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <h1 className="text-center text-[28px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </h1>
      <p className="text-center text-[15px] text-[var(--text-sub)]">
        가입한 이메일을 입력하면 비밀번호를 재설정할 수 있는 링크를 보내드립니다.
      </p>
      <ForgotPasswordForm
        initialError={
          error === "invalid-link"
            ? "유효하지 않거나 만료된 링크입니다. 다시 요청해주세요."
            : undefined
        }
      />
      <p className="text-center text-[15px]">
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          로그인으로 돌아가기
        </Link>
      </p>
    </>
  );
}
