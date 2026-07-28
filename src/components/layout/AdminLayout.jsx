import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Heart, ScrollText, LogOut,
  Menu, X, ChevronRight, Heart as HeartIcon,
  Image, BookOpen, LayoutGrid, UserCircle
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { ADMIN_NAV_LINKS, ORG } from '@/utils/constants'
import { toast } from 'react-toastify'

const NAV_ICONS = {
  LayoutDashboard,
  Heart,
  ScrollText,
  Image,
  BookOpen,
  LayoutGrid,
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isSuperAdmin = user?.role === 'super_admin'

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/admin/login', { replace: true })
    } catch {
      toast.error('Logout failed. Please try again.')
    }
  }

  const visibleLinks = ADMIN_NAV_LINKS.filter(
    (link) => !link.superAdminOnly || isSuperAdmin
  )

  // Get current page title
  const currentLink = ADMIN_NAV_LINKS.find((l) => pathname.startsWith(l.path))
  const pageTitle = currentLink?.label || 'Dashboard'

  return (
    <div className="min-h-screen bg-ivory flex">

      {/* ── Sidebar ── */}
      <>
        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-forest/50 backdrop-blur-sm z-overlay md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Sidebar panel */}
        <aside
          className={`
            fixed top-0 left-0 h-full w-64 bg-forest z-modal
            flex flex-col transition-transform duration-300
            md:translate-x-0 md:static md:z-auto
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          aria-label="Admin navigation"
        >
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-cta flex items-center justify-center shadow-cta/50">
                <HeartIcon className="w-4 h-4 text-white fill-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-white font-semibold text-body-sm leading-tight">Shangazi</p>
                <p className="text-white/40 text-tiny">Admin Panel</p>
              </div>
            </div>
            <button
              type="button"
              className="md:hidden text-white/60 hover:text-white p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 p-4 space-y-1" aria-label="Admin sections">
            {visibleLinks.map((link) => {
              const Icon = NAV_ICONS[link.icon] || Heart
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `admin-nav-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          {/* User section + logout */}
          <div className="p-4 border-t border-white/10">
            {user && (
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 mb-1 rounded-card transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/10'}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-terracotta flex items-center justify-center flex-shrink-0">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-tiny font-bold">
                      {user.username?.[0]?.toUpperCase() || 'A'}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-body-sm font-medium truncate">{user.username}</p>
                  <p className="text-white/40 text-tiny truncate">{user.role?.replace('_', ' ')}</p>
                </div>
                <UserCircle className="w-4 h-4 text-white/40 flex-shrink-0" />
              </NavLink>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="admin-nav-item w-full text-danger/70 hover:text-danger hover:bg-danger/10"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-ash/50 shadow-sm-warm sticky top-0 z-sticky">
          <div className="flex items-center justify-between px-4 md:px-6 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2 rounded-card text-forest hover:bg-ivory-dark transition-colors"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-1.5 text-body-sm">
                  <li className="text-stone">Admin</li>
                  <li aria-hidden="true"><ChevronRight className="w-3 h-3 text-stone" /></li>
                  <li className="text-forest font-semibold">{pageTitle}</li>
                </ol>
              </nav>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {user && (
                <NavLink to="/admin/profile" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-terracotta flex items-center justify-center">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-tiny font-bold">
                        {user.username?.[0]?.toUpperCase() || 'A'}
                      </span>
                    )}
                  </div>
                  <span className="text-body-sm text-forest font-medium">{user.username}</span>
                </NavLink>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main id="admin-main-content" className="flex-1 overflow-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
