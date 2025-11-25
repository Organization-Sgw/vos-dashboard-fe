import SidebarPage from '@/pages/SidebarPages'
import LoginPages from '@/pages/LoginPages'
import { createBrowserRouter, redirect } from 'react-router-dom'
import RecordListPage from '@/pages/RecordsList'
import DashboardPage from '@/pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPages />,
    handle: { breadcrumb: 'Login' },
  },
  {
    path: '/',
    element: <SidebarPage />,
    loader: () => ({ breadcrumb: 'CDR' }),

    children: [
      {
        index: true,
        loader: () => redirect('/dashboard'),
      },

      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: () => ({ breadcrumb: 'Dashboard' }),
      },
      {
        path: 'records',
        element: <RecordListPage />,
        loader: () => ({ breadcrumb: 'Records' }),
      },
    ],
  },
])

export default router
