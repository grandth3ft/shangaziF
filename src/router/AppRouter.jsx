import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import PageLoader from '@/components/ui/PageLoader'

// ── Public Pages (lazy-loaded) ─────────────────────────────────────────────
const HomePage       = lazy(() => import('@/pages/public/HomePage'))
const AboutPage      = lazy(() => import('@/pages/public/AboutPage'))
const ProgramsPage   = lazy(() => import('@/pages/public/ProgramsPage'))
const ImpactPage     = lazy(() => import('@/pages/public/ImpactPage'))
const GalleryPage    = lazy(() => import('@/pages/public/GalleryPage'))
const DonatePage     = lazy(() => import('@/pages/public/DonatePage'))
const ContactPage    = lazy(() => import('@/pages/public/ContactPage'))
const NotFoundPage   = lazy(() => import('@/pages/public/NotFoundPage'))

// ── Admin Pages (lazy-loaded) ──────────────────────────────────────────────
const LoginPage           = lazy(() => import('@/pages/admin/LoginPage'))
const DashboardPage       = lazy(() => import('@/pages/admin/DashboardPage'))
const DonationsPage       = lazy(() => import('@/pages/admin/DonationsPage'))
const DonationDetailPage  = lazy(() => import('@/pages/admin/DonationDetailPage'))
const AuditLogsPage       = lazy(() => import('@/pages/admin/AuditLogsPage'))
const ProfilePage         = lazy(() => import('@/pages/admin/ProfilePage'))
const GalleryManagePage   = lazy(() => import('@/pages/admin/GalleryManagePage'))
const ImpactStoriesPage   = lazy(() => import('@/pages/admin/ImpactStoriesPage'))
const ProgramsManagePage  = lazy(() => import('@/pages/admin/ProgramsPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public Routes ─────────────────────────────────────────── */}
          <Route element={<PageLayout />}>
            <Route path="/"          element={<HomePage />} />
            <Route path="/about"     element={<AboutPage />} />
            <Route path="/programs"  element={<ProgramsPage />} />
            <Route path="/impact"    element={<ImpactPage />} />
            <Route path="/gallery"   element={<GalleryPage />} />
            <Route path="/donate"    element={<DonatePage />} />
            <Route path="/contact"   element={<ContactPage />} />
          </Route>

          {/* ── Admin Auth ────────────────────────────────────────────── */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ── Protected Admin Routes ────────────────────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin"                element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard"     element={<DashboardPage />} />
              <Route path="/admin/donations"     element={<DonationsPage />} />
              <Route path="/admin/donations/:id" element={<DonationDetailPage />} />
              <Route path="/admin/audit-logs"    element={<AuditLogsPage />} />
              <Route path="/admin/profile"       element={<ProfilePage />} />
              <Route path="/admin/gallery"       element={<GalleryManagePage />} />
              <Route path="/admin/impact-stories" element={<ImpactStoriesPage />} />
              <Route path="/admin/programs"      element={<ProgramsManagePage />} />
            </Route>
          </Route>

          {/* ── 404 ───────────────────────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
