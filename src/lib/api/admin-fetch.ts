import { meKey, queryClient } from './query-client'

export type Problem = {
  title?: string
  detail?: string
  type?: string
  errors?: Record<string, string[]>
}

export class ApiError extends Error {
  // Khai báo field tường minh: tsconfig bật erasableSyntaxOnly nên không dùng parameter property.
  status: number
  problem: Problem | null

  constructor(status: number, problem: Problem | null) {
    super(problem?.detail ?? problem?.title ?? `HTTP ${status}`)
    this.status = status
    this.problem = problem
  }
}

let csrfToken: string | null = null

/** Gọi sau đăng nhập / đăng xuất để lấy lại token CSRF. */
export function resetCsrf() {
  csrfToken = null
}

async function getCsrf(): Promise<string> {
  if (!csrfToken) {
    const res = await fetch('/api/v1/auth/csrf', { cache: 'no-store' })
    csrfToken = ((await res.json()) as { token: string }).token
  }
  return csrfToken
}

export async function adminFetch<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
  retried = false,
): Promise<T> {
  const method = (init.method ?? 'GET').toUpperCase()
  const headers = new Headers(init.headers)
  headers.set('accept', 'application/json')
  let body = init.body
  if (init.json !== undefined) {
    headers.set('content-type', 'application/json')
    body = JSON.stringify(init.json)
  }
  if (method !== 'GET') headers.set('X-XSRF-TOKEN', await getCsrf())

  const res = await fetch(`/api/v1${path}`, { ...init, method, headers, body, cache: 'no-store' })
  if (res.ok) return (res.status === 204 ? undefined : await res.json()) as T

  const problem = (await res.json().catch(() => null)) as Problem | null
  if (res.status === 400 && problem?.type?.endsWith('/errors/csrf') && !retried) {
    resetCsrf() // token hết hạn: lấy token mới, thử lại đúng 1 lần
    return adminFetch<T>(path, init, true)
  }
  if (res.status === 401 && path !== '/auth/login' && path !== '/auth/me') {
    queryClient.setQueryData(meKey, null) // phiên hết hạn: RequireAuth (sau này) đưa về trang đăng nhập
  }
  throw new ApiError(res.status, problem)
}
