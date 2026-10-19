import { Link, Outlet, useLocation } from 'react-router';
import { DEFAULT_SITE_NAME } from '@/lib/brand';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Tổng quan' },
  { href: '/services', label: 'Dịch vụ' },
  { href: '/posts', label: 'Bài viết' },
  { href: '/pages', label: 'Trang tĩnh' },
  { href: '/slides', label: 'Slide / Banner' },
  { href: '/testimonials', label: 'Ý kiến khách' },
  { href: '/faqs', label: 'Hỏi đáp' },
  { href: '/albums', label: 'Album' },
  { href: '/media', label: 'Media' },
  { href: '/branches', label: 'Chi nhánh' },
  { href: '/settings', label: 'Cài đặt' },
  { href: '/users', label: 'Tài khoản' },
  { href: '/audit-logs', label: 'Nhật ký' },
];

export function AdminShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-60 border-r bg-card flex flex-col shrink-0">
        <div className="h-14 border-b flex items-center px-4 font-bold text-sm tracking-wide">
          {DEFAULT_SITE_NAME}
        </div>
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto text-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b flex items-center justify-between px-6 bg-card shrink-0">
          <h1 className="text-sm font-semibold">Trang quản trị</h1>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
