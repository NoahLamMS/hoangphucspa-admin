import { Outlet, Navigate, useLocation } from 'react-router';
import { useMe } from '@/features/auth/use-me';
import { ApiError } from '@/lib/api/admin-fetch';

export function RequireAuth() {
  const location = useLocation();
  const { data: me, error, isPending } = useMe();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Đang tải...</div>;
  }

  if (me === null || (error instanceof ApiError && error.status === 401)) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (error || !me) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">Không thể kết nối đến máy chủ</p>
      </div>
    );
  }

  return <Outlet />;
}

export function RequireRole({ role }: { role: 'Admin' | 'Editor' }) {
  const { data: me } = useMe();
  return me?.roles.includes(role) ? <Outlet /> : <div className="p-8 text-center">Không có quyền truy cập</div>;
}
