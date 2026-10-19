import { describe, expect, it } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
  it('formats ISO string to dd/MM/yyyy', () => {
    expect(formatDate('2026-10-19T08:00:00Z')).toBe('19/10/2026');
  });

  it('handles null/undefined/empty', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
    expect(formatDate('')).toBe('');
  });
});
