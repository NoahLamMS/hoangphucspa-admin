# hoangphucspa-admin — Agent Guide (Quy tắc phát triển toàn diện)

Repo: `hoangphucspa-admin` (Trang quản trị CMS).
Stack: **React 19** · **TypeScript** · **Vite 8** · **Ant Design 6** (`antd` + `@ant-design/icons`) · **React Router v8** (base `/admin/`) · **TanStack Query v5**.
Cổng dev: 5173 (hoặc 5174 khi 5173 bị chiếm).

---

## I. NGUYÊN TẮC LÀM VIỆC CỐT LÕI (BẮT BUỘC VỚI MỌI AGENT)

1. **Tuyệt đối KHÔNG tự ý chạy lệnh Git:** Cấm chạy `git commit`, `git push`, `git checkout`, `git reset`. Người dùng tự thực hiện mọi thao tác Git. Hoàn thành việc chỉ đưa ra **Gợi ý lệnh commit**.
2. **Verify trước khi bàn giao:** Mọi thay đổi bắt buộc phải pass bộ kiểm tra:
   ```bash
   npm run lint && npm run typecheck && npm run test && npm run build
   ```
3. **Phạm vi thay đổi (Change Scope):**
   - Thay đổi đúng trọng tâm, tối thiểu số dòng code cần thiết. Không tiện tay refactor, đổi tên, format code ngoài vùng yêu cầu.
   - Ưu tiên sửa lỗi ngay tại component bị lỗi, không đẻ thêm component / wrapper / nhánh `isMobile` thừa.
   - Thấy lỗi khác ngoài yêu cầu: **Báo lại cho người dùng, không tự ý sửa kèm** (trừ khi không sửa thì phần việc chính không chạy được).
   - Xóa code: Chỉ xóa khi tìm kiếm toàn dự án (`rg`) xác nhận có 0 tham chiếu.
4. **Không hard-code thương hiệu:**
   - Tên thương hiệu, hotline, logo tuyệt đối không hard-code literal trong component hay file HTML. Đọc từ `GET /site` hoặc hằng số `DEFAULT_SITE_NAME` (`@/lib/brand.ts`).
5. **Bảo mật:** Không đặt secret trong mã nguồn.

---

## II. RANH GIỚI THƯ MỤC & IMPORT (IMPORT BOUNDARIES)

1. **Chiều phụ thuộc:** `app → features → components / lib`.
   - `components` và `lib` **không được import ngược** vào `features` hay `app`.
   - Feature gọi feature khác **chỉ được phép qua** `@/features/<feature>` (file `index.ts`), cấm import sâu vào thư mục nội bộ của feature khác (vd: cấm import `@/features/services/components/xxx`).
2. **Quy tắc Alias:**
   - Import vượt ranh giới (`@/components`, `@/lib`, `@/features`) **bắt buộc** dùng alias `@/`, không dùng đường dẫn tương đối leo ra ngoài (`../../..`).
   - Trong cùng feature: Dùng đường dẫn tương đối tối đa 2 cấp (`./`, `../`), sâu hơn bắt buộc chuyển sang alias `@/`.

---

## III. PROMPT TẠO PAGE MỚI (§1 – §17 & CHECKLIST BẮT BUỘC)

Áp dụng cho mọi màn hình mới (List, Create, Detail/Edit, Drawer/Modal, Tab cấu hình).

### §1. Thứ tự chọn component
`@/components/*` (dùng chung) → **Ant Design** (`antd`) → Thẻ HTML trần (chỉ khi Antd không có).
Không tự dựng lại thứ đã có sẵn trong Antd:
- Khung page: `Layout`, `Card`, `Typography.Title`, `Breadcrumb`.
- Bảng & danh sách: `DataTable` (bọc `Table` antd).
- Nút bấm: `Button` (Antd).
- Phân trang: Tích hợp trong `Table` hoặc `Pagination` (Antd).
- Ô tìm kiếm: `Input.Search` (Antd).
- Skeleton: `Skeleton`, `Skeleton.Button`, `Skeleton.Input`.
- Rỗng / lỗi: `Empty`, `Result`, `Alert`.
- Form & fields: `Form`, `Form.Item`, `Input`, `Select`, `DatePicker`, `Switch`, `Upload`.

### §2. Thao tác trên dòng — Hiện trực tiếp, không giấu trong menu 3 chấm
- Cột "Thao tác" render thẳng các icon button:
  - Nút Xem / Sửa: `Button` type="text" kèm `Tooltip` và `aria-label`.
  - Nút Xóa: `Button` danger type="text" kèm `Tooltip title="Xóa"`.
- `RowActionsMenu` (menu 3 chấm) **chỉ** dùng khi có từ 4 hành động trở lên hoặc toàn hành động phụ hiếm dùng.
- Thao tác phá hủy (Xóa, ngừng hoạt động): Bắt buộc xác nhận qua `Modal.confirm({ centered: true, okType: 'danger' })`.

### §3. Quy tắc Màu sắc
- Ant Design đã có token trong `ConfigProvider` global (`src/main.tsx`, primary `#2563eb`) → **Không tự gán màu tay**.
- Không `style={{ color: '#...' }}`, không viết class màu đè lên `Button`, `Tag`, `Typography`, `Table`.
- Cần màu riêng: Khai báo token hoặc biến trong `src/styles/theme.css`. **CẤM VIẾT MÃ MÀU HEX TRẦN TRONG TSX**.

### §4. Bảng không được tràn layout
- `Table` antd mặc định phải có `scroll={{ x: 'max-content' }}`.
- Mọi cột text dài phải khai báo `width` cụ thể để bảng không tự giãn vô hạn.
- Wrapper chứa bảng: Giữ `overflow-hidden` để bảng cuộn ngang bên trong, không đẩy layout ngoài.
- Cột Thao tác: Cố định `width` (thường 100–120px), `align="center"`, cân nhắc `fixed: 'right'` khi bảng nhiều cột.

### §5. Nội dung dài → Rút gọn văn bản
- Các cột tiêu đề dài, mô tả, nội dung tóm tắt: Dùng prop `ellipsis` của Antd `Table.Column` hoặc `<Typography.Paragraph ellipsis={{ rows: 1, tooltip: true }}>`.
- Không tự viết hàm truncate thủ công.

### §6. Mobile — Card thay Bảng
- Kiểm tra thiết bị mobile qua hook / media query:
  - Desktop: Render `DataTable` (Antd `Table`).
  - Mobile: Render danh sách `Card` của Antd (`<Card title={...} size="small">`), mỗi dòng một bản ghi.
- Tiêu đề Card đi qua prop `title`, góc phải để switch/trạng thái; body dùng `Flex justify="space-between"` để hiển thị nhãn và giá trị.

### §7. Đủ trạng thái: Loading, Empty, Error
- Đang tải: Bảng bật prop `loading={true}` hoặc hiển thị `Skeleton`.
- Lỗi kết nối: Hiển thị component lỗi kèm nút "Thử lại" (`onRetry`), **không được biến lỗi thành danh sách rỗng**. Giữ nguyên object lỗi để nhận diện đúng mã lỗi (403, 404, 500).
- Rỗng thật: Dùng `Empty` của Antd nhưng **vẫn giữ nguyên khung toolbar và header bảng**.

### §8. Bộ lọc danh sách (Filter)
- Ô tìm kiếm từ khóa: Debounce tối thiểu 300ms trước khi gọi API; giá trị gõ cập nhật tức thì trên input.
- Bộ lọc nhiều trường: Nút mở Drawer lọc (`Drawer` Antd) hoặc Form lọc ngang phía trên bảng.
- **Khi người dùng thay đổi bất kỳ điều kiện lọc nào, bắt buộc đặt lại `page = 1`**.

### §9. Service và API
- Mọi request API đi qua hàm `adminFetch()` (`@/lib/api/admin-fetch.ts`).
- Service chỉ làm nhiệm vụ gọi API: Không toast, không lưu state trong service, không bọc try-catch nuốt lỗi.

### §10. State và Hook trong Feature (Chống Race Condition)
- Hook của feature quản lý `useQuery` / `useMutation`, quản lý loading, error, params, refetch. Page component chỉ dựng UI.
- **Chống race condition:** Dùng `requestIdRef` trong các hook fetch tùy biến để bỏ qua phản hồi nếu người dùng bấm trang/tìm kiếm nhanh liên tục.
- Form submit: Khi gửi form thất bại do validation, bật `scrollToFirstError: true` của Antd `Form` để tự động cuộn tới ô lỗi đầu tiên. Khi thành công, toast `message.success("Đã lưu")`.

### §11. State hiển thị nằm trên URL (Sync URL)
- Các trạng thái: `page`, `pageSize`, `search`, các filter, `tab` → Lưu trên URL query parameters (`useSearchParams` với `replace: true`).
- Reload trang, copy link gửi người khác, hoặc bấm Back/Forward trình duyệt phải khôi phục chính xác trạng thái đó.

### §12. Chữ hiển thị
- Viết **thẳng tiếng Việt** trong TSX. Không thêm key i18n, không bọc `t(...)`.
- Kiểm tra chính tả, dấu thanh và khoảng trắng trước khi bàn giao.
- Chuỗi tĩnh không bọc ngoặc thừa: `title="Quản lý dịch vụ"` (không viết `title={"Quản lý dịch vụ"}`).

### §13. Mở chi tiết
- Desktop: Mở chi tiết/chỉnh sửa bằng cách bấm vào cột Tên (link text), hoặc bấm nút icon ở cột Thao tác. Không gắn `onClick` cho cả dòng `<tr>` (dễ bấm nhầm khi click switch/checkbox).
- Mobile: Cho phép bấm cả `Card`.

### §14. Không gạch tên / làm mờ dòng khi ngừng hoạt động
- Không dùng `line-through` hay `opacity` mờ toàn dòng khi bản ghi bị ẩn/ngừng hoạt động. Trạng thái chỉ thể hiện ở cột Trạng thái (Badge / Tag / Switch).

### §15. Bật/tắt trạng thái (Switch): Xác nhận & Chống spam
- Phải có xác nhận trước khi gọi API (qua `Modal.confirm` hoặc Popconfirm).
- Chống spam: Dòng đang gọi API phải bật `loading` trên switch, các dòng khác khóa lại, mở khóa trong `finally`.

### §16. Padding mobile
- Đảm bảo padding tối thiểu `12px` (`p-3`) trên mobile để nội dung không dán sát mép màn hình.

### §17. Phân quyền Read-only
- Người dùng chỉ có quyền Xem (không có quyền Sửa/Xóa):
  - Form chi tiết bật `<Form disabled>`, ẩn nút Lưu/Cập nhật, nút còn lại đổi thành "Quay lại" hoặc "Đóng".
  - Danh sách: Switch chuyển thành Badge chỉ đọc, icon Sửa chuyển thành icon Xem.

---

## IV. TYPES & CODE QUALITY

1. **Tuyệt đối cấm dùng `any` và `unknown` không kiểm tra:**
   - Mọi biến, props, state, hàm phải có kiểu tường minh.
   - Kiểu DTO / Schema lấy từ `@/lib/api/schema.d.ts` (sinh tự động qua `npm run gen:api`).
2. **Cấm dùng `eslint-disable`:** Xử lý triệt để nguyên nhân gốc.
3. **Cấm đổi biến thừa thành `_x` để lách lint:** Xóa hẳn biến không dùng.
4. **Cấu trúc Type & Constant:**
   - Khai báo Type/Interface đặt tại `types.ts` trong từng feature.
   - `constants.ts` chỉ chứa mapping nhãn, màu Tag, options danh sách.
   - Tránh hard-code chuỗi trạng thái literal: So sánh qua hằng số / union type đã khai báo.
5. **JSX & Toán tử logic:**
   - Ưu tiên toán tử logic: `Boolean(cond) && <Component />` thay vì `cond ? <Component /> : null`.
   - Với số: Luôn kiểm tra tường minh `count > 0` hoặc `Boolean(count)` để không vô tình render số `0` ra màn hình.
   - Tránh ternary lồng nhau: Dùng bảng lookup map, `switch`, hoặc early return.
6. **Kích thước file:** File nên từ 120–250 dòng. Khi vượt quá 350 dòng thì tách component con, hook, config columns ra file riêng trong cùng feature.
7. **Loại bỏ `console.log`:** Xóa sạch mọi log debug trước khi bàn giao. `console.error` chỉ nằm trong khối `catch` bắt lỗi thật sự.
8. **Format ngày & số:**
   - Format ngày dùng `formatDate()` (`@/lib/format.ts`) với múi giờ `Asia/Ho_Chi_Minh`.
   - Format tiền tệ dùng `Intl.NumberFormat('vi-VN')`.

---

## V. NAMING CONVENTIONS

| Loại | Quy ước | Ví dụ |
|---|---|---|
| Thư mục Feature | `kebab-case` | `services`, `post-categories`, `site-settings` |
| Component file | `kebab-case.tsx` hoặc `PascalCase.tsx` | `service-list-page.tsx`, `SlugInput.tsx` |
| Hook | `useXxx.ts` | `useServices.ts`, `useMe.ts` |
| Columns cấu hình | `<name>.columns.tsx` | `service.columns.tsx` |
| Types | `types.ts` hoặc `<name>.types.ts` | `service.types.ts` |
| Constants | `constants.ts` | `service.constants.ts` |

---

## VI. FEATURE WORKFLOW PLAYBOOK

### Luồng I: Xây dựng Feature mới
1. **I-0. Chuẩn bị:** Khảo sát DTO/schema từ OpenAPI (`schema.d.ts`). Liệt kê các file sẽ tạo trong `src/features/<feature>/`.
2. **I-1. Routes & Quyền:** Khai báo route trong `src/router.tsx` dưới nhánh `/admin/`, bọc qua `RequireAuth` / `RequireRole`.
3. **I-2. Types & Service:** Khai báo types trong `types.ts`. Tạo service gọi API qua `adminFetch()`.
4. **I-3. Hook & UI:** Dựng hook (quản lý state/fetch/URL search params). Dựng UI tuân thủ §1–§17.
5. **I-4. QA tay:** Thử nghiệm tạo, sửa, xóa, tìm kiếm, phân trang, hiển thị mobile, trường hợp lỗi mạng.
6. **I-5. Verify:** Chạy `npm run lint && npm run typecheck && npm run test && npm run build`.

### Luồng J: Sửa Feature hiện có
1. **J-0. Định vị:** Tìm đúng route và file page liên quan. Đọc luồng dữ liệu từ page → hook → service → schema.
2. **J-1. Sửa đổi phạm vi hẹp:** Chỉ sửa đúng điểm lỗi hoặc đúng tính năng yêu cầu. Kiểm tra các nơi đang dùng symbol đó (`rg`).
3. **J-2. Verify:** Chạy lại toàn bộ test và build trước khi báo xong.

---

## VII. GỢI Ý COMMIT MESSAGE

Khi hoàn thành task, luôn gợi ý commit message theo định dạng:
```text
<type>(<module>): <mô tả ngắn>

- Gạch đầu dòng thay đổi UI (nếu có)
- Gạch đầu dòng thay đổi logic code / xử lý API
```
