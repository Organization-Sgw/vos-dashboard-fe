import SidebarPage from '@/pages/SidebarPages'
import LoginPages from '@/pages/LoginPages'
import { createBrowserRouter, redirect } from 'react-router-dom'
import RecordListPage from '@/pages/RecordsList'
import DashboardPage from '@/pages/Dashboard'
import RecordDetail from '@/pages/RecordDetail'

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
      {
        path: 'detail',
        element: <RecordDetail />,
        loader: () => ({ breadcrumb: 'Detail Record' }),
      },
    ],
  },
])

export default router
