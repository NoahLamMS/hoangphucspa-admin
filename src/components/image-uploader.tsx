import { Input } from 'antd'

interface ImageUploaderProps {
  value?: string | null;
  onChange?: (url: string) => void;
}

export function ImageUploader({ value = '', onChange }: ImageUploaderProps) {
  return (
    <Input
      value={value ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder="Đường dẫn ảnh hoặc tải lên..."
      allowClear
    />
  );
}
