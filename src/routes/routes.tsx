import SidebarPage from '@/pages/SidebarPages'
import LoginPages from '@/pages/LoginPages'
import { createBrowserRouter, redirect } from 'react-router-dom'
import RecordListPage from '@/pages/RecordsList'
import DashboardPage from '@/pages/Dashboard'
import RecordDetail from '@/pages/RecordDetail'
import InteruptAnalysisPages from '@/pages/InteruptAnalysis'

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
        loader: () => ({ breadcrumb: 'Records' }),
        children: [
          {
            index: true,
            element: <RecordListPage />,
          },
          {
            path: ':id',
            element: <RecordDetail />,
            loader: ({ params }) => ({ breadcrumb: params.id }),
          },
        ],
      },
      {
        path: 'interupt',
        element: <InteruptAnalysisPages />,
        loader: () => ({ breadcrumb: 'Interupt Analysis' }),
      },
    ],
  },
])

export default router
