# hoangphucspa-admin

Trang quản trị (CMS) của HoangPhucSpa: React 19 + Vite (SPA), chạy dưới đường dẫn `/admin/`. Hiện là khung (skeleton): chỉ có trang chủ hiển thị `API: <trạng thái>` để kiểm tra kết nối tới backend. Chưa có đăng nhập hay tính năng nghiệp vụ.

Repo này độc lập với `hoangphucspa-backend` (API, nơi duy nhất chạm DB) và `hoangphucspa-web` (site công khai).

## Công nghệ

- React 19, Vite, TypeScript (giữ phiên bản do generator cài)
- React Router (`createBrowserRouter`, `basename: '/admin'`)
- TanStack Query
- Tailwind CSS 4 + shadcn/ui (Radix, nền Neutral)
- Vitest + Testing Library + jsdom
- `openapi-typescript` để sinh type từ OpenAPI của backend

## Yêu cầu

- Node 24 (`.nvmrc`): `source ~/.nvm/nvm.sh && nvm use 24`
- API đang chạy ở `http://localhost:5080` (xem README của `hoangphucspa-backend`)

## Chạy local

```bash
npm install
npm run dev
```

Mở `http://localhost:5173/admin/`. Cổng 5173 đặt `strictPort: true` trong `vite.config.ts`, nên nếu cổng đang bị tiến trình khác chiếm, Vite báo lỗi thay vì tự đổi cổng. Khi đó chạy tạm trên cổng khác (không cần sửa cấu hình):

```bash
npm run dev -- --port 5174
```

Vite proxy `/api`, `/images`, `/media` tới `API_ORIGIN` (mặc định `http://localhost:5080`), nên trình duyệt gọi API cùng origin với trang quản trị.

## Lệnh

| Lệnh | Việc làm |
|---|---|
| `npm run dev` | Chạy dev server, base `/admin/` |
| `npm run build` | `tsc -b` rồi `vite build` (ra `dist/`, asset dưới `/admin/`) |
| `npm run preview` | Xem thử bản build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc -b` |
| `npm run test` | Vitest (`vitest run`) |
| `npm run gen:api` | Sinh `src/lib/api/schema.d.ts` từ `http://localhost:5080/openapi/v1.json` (cần API chạy ở chế độ Development) |

`src/lib/api/schema.d.ts` là file sinh tự động, được giữ trong repo và bị ESLint bỏ qua. Sau khi backend đổi API, chạy lại `npm run gen:api`.

## Cấu trúc

```
src/
  app/        khung ứng dụng (AdminShell, trang 404)
  features/   mỗi tính năng một thư mục (hiện có home)
  lib/        brand.ts, slug.ts, api/ (admin-fetch, query-client, schema.d.ts)
  components/ui/  component shadcn
  styles/     theme.css (token riêng của admin)
  router.tsx, main.tsx, index.css
```

Alias `@/*` trỏ tới `src/*` (khai báo `paths` trong tsconfig, không dùng `baseUrl`).

## Quy ước

- Tên thương hiệu mặc định `Thương hiệu Demo` chỉ nằm ở `src/lib/brand.ts` và `<title>` trong `index.html`. Thương hiệu thật sẽ lấy từ cấu hình của API.
- Không đặt secret trong biến `VITE_*`: mọi giá trị này bị đưa vào mã gửi cho trình duyệt. `.env.development` chỉ chứa giá trị công khai; `.env` và `.env.local` bị git bỏ qua.
- Trang quản trị có `noindex, nofollow`.
- `ApiError` khai báo field tường minh vì tsconfig bật `erasableSyntaxOnly` (không dùng parameter property).
