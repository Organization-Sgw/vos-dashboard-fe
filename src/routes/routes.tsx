import DashboardPage from '@/pages/DashboardPages'
import LoginPages from '@/pages/LoginPages'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPages />,
  },
  {
    path: '/',
    element: <DashboardPage />,
  },
])

export default router
