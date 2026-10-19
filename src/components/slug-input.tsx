import { Input } from 'antd'
import { slugify } from '@/lib/slug'

interface SlugInputProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export function SlugInput({ value = '', onChange, placeholder = 'duong-dan-bai-viet' }: SlugInputProps) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(slugify(e.target.value))}
      placeholder={placeholder}
      allowClear
    />
  );
}
