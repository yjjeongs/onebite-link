import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-[28px] font-semibold tracking-tight text-[var(--text)]">
        한입 링크
      </h1>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            className="field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]"
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
            className="field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]"
          />
        </div>
        <button
          type="button"
          className="btn-accent mt-1 rounded-[980px] bg-[var(--accent)] px-5 py-3 text-[17px] text-white"
        >
          로그인
        </button>
      </form>
      <p className="text-center text-[15px] text-[var(--text-sub)]">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[var(--accent)] hover:underline">
          회원가입
        </Link>
      </p>
    </>
  );
}
