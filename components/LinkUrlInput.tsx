type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkUrlInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
        링크
      </label>
      <input
        id="url"
        name="url"
        type="url"
        required
        placeholder="https://example.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)]"
      />
    </div>
  );
}
