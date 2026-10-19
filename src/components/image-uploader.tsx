interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Hình ảnh</label>
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Đường dẫn ảnh hoặc tải lên..."
        className="w-full rounded-md border px-3 py-2 text-sm"
      />
    </div>
  );
}
