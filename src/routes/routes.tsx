import LoginPages from '@/pages/LoginPages'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPages />,
  },
])

export default router
