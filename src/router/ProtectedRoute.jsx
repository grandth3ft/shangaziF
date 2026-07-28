import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import PageLoader from '@/components/ui/PageLoader'

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const location = useLocation()

  // Still rehydrating auth from storage — show loader
  if (isLoading) {
    return <PageLoader />
  }

  // Not authenticated → redirect to login, preserve intended destination
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
