import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ScrollText, User, Clock, RefreshCw } from 'lucide-react'
import { getAuditLogs } from '@/api/admin'
import { formatDateTime, formatRelativeTime } from '@/utils/formatters'
import Skeleton from '@/components/ui/Skeleton'
import { useAuthStore } from '@/store/authStore'
import { staggerContainer, fadeInUp } from '@/utils/animations'
import Button from '@/components/ui/Button'

// Map action strings to colour tokens
const ACTION_COLORS = {
  LOGIN_SUCCESS:          'bg-success/10 text-success',
  LOGIN_FAILED:           'bg-danger/10 text-danger',
  LOGOUT:                 'bg-stone/10 text-stone',
  PASSWORD_CHANGED:       'bg-info/10 text-info',
  PASSWORD_CHANGE_FAILED: 'bg-danger/10 text-danger',
  PROFILE_UPDATED:        'bg-amber/10 text-amber',
  AVATAR_UPDATED:         'bg-amber/10 text-amber',
  USER_CREATED:           'bg-forest/10 text-forest',
  DONATION_VIEWED:        'bg-terracotta/10 text-terracotta',
  REPORT_EXPORTED:        'bg-sage/10 text-sage',
  GALLERY_IMAGE_CREATED:  'bg-terracotta/10 text-terracotta',
  GALLERY_IMAGE_UPDATED:  'bg-amber/10 text-amber',
  GALLERY_IMAGE_DELETED:  'bg-danger/10 text-danger',
}

function detailsText(details) {
  if (!details) return '—'
  if (typeof details === 'string') return details
  try {
    return Object.entries(details)
      .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
      .join(' · ')
  } catch {
    return JSON.stringify(details)
  }
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuthStore()

  // Guard — user may be null briefly on first render after rehydration
  const isSuperAdmin = user?.role === 'super_admin'

  const fetchLogs = useCallback(async () => {
    if (!isSuperAdmin) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await getAuditLogs({ page, per_page: 20 })
      setLogs(data?.logs ?? [])
      setPagination(data?.pagination ?? null)
    } catch (err) {
      setError(err.message ?? 'Failed to load audit logs.')
    } finally {
      setIsLoading(false)
    }
  }, [page, isSuperAdmin])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  // While auth is still loading (user is null), show a loader
  if (user === null) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isSuperAdmin) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <ScrollText className="w-12 h-12 text-stone mb-4" aria-hidden="true" />
        <h2 className="font-display text-heading-md text-forest mb-2">Access Restricted</h2>
        <p className="text-body-sm text-stone">Audit logs are only accessible to super administrators.</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-heading-lg text-forest">Audit Logs</h1>
            <p className="text-body-sm text-stone mt-1">Complete record of all admin actions on the platform</p>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={fetchLogs} isLoading={isLoading} loadingText="Refreshing…">
            Refresh
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm overflow-hidden">
          {error ? (
            <div className="p-8 flex flex-col items-center gap-4 text-center">
              <p className="text-body-sm text-danger">{error}</p>
              <Button variant="secondary" size="sm" onClick={fetchLogs}>Retry</Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[540px]" aria-label="Audit logs">
                  <thead>
                    <tr className="bg-ivory-dark border-b border-ash/50">
                      {['Admin', 'Action', 'Details', 'Time'].map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 text-left text-tiny font-semibold text-stone uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      Array.from({ length: 8 }).map((_, i) => <Skeleton.TableRow key={i} />)
                    ) : logs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-16 text-center text-body-sm text-stone">No audit logs found.</td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr key={log.id} className="border-b border-ash/30 hover:bg-ivory/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                                <User className="w-3.5 h-3.5 text-forest" aria-hidden="true" />
                              </div>
                              <span className="text-body-sm font-medium text-forest">{log.admin_username || 'System'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-tiny font-semibold whitespace-nowrap ${ACTION_COLORS[log.action] || 'bg-stone/10 text-stone'}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-body-sm text-stone max-w-[200px] truncate" title={detailsText(log.details)}>
                            {detailsText(log.details)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-tiny text-stone whitespace-nowrap">
                              <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                              <span title={formatDateTime(log.created_at)}>{formatRelativeTime(log.created_at)}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-ash/50 flex-wrap gap-3">
                  <p className="text-tiny text-stone">
                    Page {pagination.page} of {pagination.pages} — {pagination.total?.toLocaleString()} total
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => p - 1)}
                      disabled={page <= 1}
                      className="w-8 h-8 rounded-card border border-ash flex items-center justify-center text-stone hover:text-forest disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="text-tiny font-semibold text-forest px-2">{page}</span>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={page >= pagination.pages}
                      className="w-8 h-8 rounded-card border border-ash flex items-center justify-center text-stone hover:text-forest disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
