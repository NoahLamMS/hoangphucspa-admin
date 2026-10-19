import { slugify } from '@/lib/slug';

interface SlugInputProps {
  value: string;
  onChange: (val: string) => void;
}

export function SlugInput({ value, onChange }: SlugInputProps) {
  return (
    <div>
      <label className="text-sm font-medium">Đường dẫn (Slug)</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(slugify(e.target.value))}
        className="w-full rounded-md border px-3 py-2 text-sm mt-1"
        placeholder="duong-dan-bai-viet"
      />
    </div>
  );
}
