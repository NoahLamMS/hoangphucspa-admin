import { createBrowserRouter } from 'react-router'
import { AdminShell } from '@/app/admin-shell'
import { NotFoundPage } from '@/app/not-found-page'
import { HomePage } from '@/features/home/home-page'

export const router = createBrowserRouter(
  [
    {
      element: <AdminShell />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: '/admin' },
)
