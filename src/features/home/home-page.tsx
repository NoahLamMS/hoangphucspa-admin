import { useQuery } from '@tanstack/react-query'
import { adminFetch } from '@/lib/api/admin-fetch'

type HealthResponse = { status: string }

export function HomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['health'],
    queryFn: () => adminFetch<HealthResponse>('/health'),
    retry: false,
  })

  // Một text node duy nhất để dễ kiểm tra bằng test/grep.
  const text = isPending ? 'API: …' : isError ? 'API: Unreachable' : `API: ${data.status}`

  return <p>{text}</p>
}
