import type { Folder } from "@/lib/mock-data";

type Props = {
  folders: Folder[];
  value: string;
  onChange: (value: string) => void;
};

export default function FolderSelect({ folders, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="folder" className="text-sm font-medium">
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg border border-foreground/20 bg-background px-3 text-sm outline-none focus:border-foreground"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
