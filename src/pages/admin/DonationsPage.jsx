import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Download, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { useAdminDonations } from '@/hooks/useAdminDonations'
import { exportDonationsCSV } from '@/api/admin'
import { formatCurrency, formatDateTime, maskPhone } from '@/utils/formatters'
import { StatusBadge } from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import Skeleton from '@/components/ui/Skeleton'
import { toast } from 'react-toastify'
import { fadeInUp } from '@/utils/animations'

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending',   label: 'Pending' },
  { value: 'failed',    label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export default function DonationsPage() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo]     = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const { donations, pagination, filters, isLoading, error, updateFilters, goToPage } = useAdminDonations()

  const handleSearch = (e) => {
    e.preventDefault()
    updateFilters({ search, status, date_from: dateFrom, date_to: dateTo })
  }

  const handleReset = () => {
    setSearch(''); setStatus(''); setDateFrom(''); setDateTo('')
    updateFilters({ search: '', status: '', date_from: '', date_to: '' })
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportDonationsCSV(status || undefined)
      toast.success('CSV exported successfully.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-heading-lg text-forest">Donations</h1>
          <p className="text-body-sm text-stone mt-1">
            {pagination ? `${pagination.total?.toLocaleString()} total donations` : 'Loading…'}
          </p>
        </div>
        <Button variant="secondary" size="md" isLoading={isExporting} loadingText="Exporting…" onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-card shadow-sm-warm p-5 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Search name, phone, receipt…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              aria-label="Search donations"
            />
            <Select
              options={STATUS_OPTIONS}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="All Statuses"
              aria-label="Filter by status"
            />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              aria-label="From date"
            />
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              aria-label="To date"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary" size="sm" leftIcon={<Filter className="w-4 h-4" />}>Apply Filters</Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
          </div>
        </form>
      </motion.div>

      {/* Table */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-card shadow-sm-warm overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-body-sm text-danger">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full min-w-[640px]" aria-label="Donations table">
                <thead>
                  <tr className="bg-ivory-dark border-b border-ash/50">
                    {['Donor', 'Phone', 'Amount', 'Status', 'Date/Time', 'Receipt', 'Actions'].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 text-left text-tiny font-semibold text-stone uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <Skeleton.TableRow key={i} />)
                  ) : donations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-body-sm text-stone">
                        No donations found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    donations.map((d) => (
                      <tr key={d.id} className="border-b border-ash/30 hover:bg-ivory/50 transition-colors group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-terracotta font-bold text-tiny">{d.donor_name?.[0]?.toUpperCase()}</span>
                            </div>
                            <span className="text-body-sm font-medium text-forest truncate max-w-[120px]">{d.donor_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-body-sm text-stone font-mono">{maskPhone(d.phone_number)}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-body-sm text-forest whitespace-nowrap">{formatCurrency(d.amount)}</td>
                        <td className="px-4 py-3"><StatusBadge status={d.payment_status} /></td>
                        <td className="px-4 py-3 text-tiny text-stone whitespace-nowrap">{formatDateTime(d.created_at)}</td>
                        <td className="px-4 py-3 font-mono text-tiny text-stone">{d.mpesa_receipt_number || '—'}</td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/admin/donations/${d.id}`}
                            className="inline-flex items-center gap-1 text-tiny font-semibold text-terracotta hover:underline"
                            aria-label={`View donation by ${d.donor_name}`}
                          >
                            <Eye className="w-3 h-3" aria-hidden="true" /> View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-ash/50 flex-wrap gap-3">
                <p className="text-tiny text-stone">
                  Page {pagination.page} of {pagination.pages} — {pagination.total?.toLocaleString()} total
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="w-8 h-8 rounded-card border border-ash flex items-center justify-center text-stone hover:text-forest hover:border-stone disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-card text-tiny font-semibold transition-colors ${page === pagination.page ? 'bg-terracotta text-white' : 'border border-ash text-stone hover:text-forest hover:border-stone'}`}
                        aria-label={`Page ${page}`}
                        aria-current={page === pagination.page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => goToPage(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="w-8 h-8 rounded-card border border-ash flex items-center justify-center text-stone hover:text-forest hover:border-stone disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
    </div>
  )
}
