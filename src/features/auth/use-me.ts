import { useQuery } from '@tanstack/react-query';
import { adminFetch } from '@/lib/api/admin-fetch';
import { meKey } from '@/lib/api/query-client';

export type MeDto = {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  mustChangePassword: boolean;
};

export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: () => adminFetch<MeDto>('/auth/me'),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
