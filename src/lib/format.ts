const formatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: 'Asia/Ho_Chi_Minh',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(isoDate: string | Date | null | undefined): string {
  if (!isoDate) return '';
  const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate;
  if (Number.isNaN(date.getTime())) return '';
  return formatter.format(date);
}
