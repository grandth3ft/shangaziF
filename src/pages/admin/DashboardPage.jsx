import { motion } from 'framer-motion'
import { TrendingUp, Heart, Clock, XCircle, Download, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { useStats } from '@/hooks/useStats'
import { useAdminDonations } from '@/hooks/useAdminDonations'
import { exportDonationsCSV } from '@/api/admin'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { StatusBadge } from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import Button from '@/components/ui/Button'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeInUp } from '@/utils/animations'

// Simulated weekly chart data — in production this would come from an API endpoint
const CHART_DATA = [
  { day: 'Mon', amount: 12400, count: 8 },
  { day: 'Tue', amount: 18200, count: 12 },
  { day: 'Wed', amount: 9800,  count: 6 },
  { day: 'Thu', amount: 24500, count: 16 },
  { day: 'Fri', amount: 31000, count: 21 },
  { day: 'Sat', amount: 16700, count: 11 },
  { day: 'Sun', amount: 8400,  count: 5 },
]

const PIE_COLORS = {
  completed: '#2E7D52',
  pending:   '#C47A1E',
  failed:    '#B33A2A',
  cancelled: '#8A8078',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-card shadow-md-warm p-3 border border-ash text-body-sm">
      <p className="font-semibold text-forest mb-1">{label}</p>
      <p className="text-stone">Amount: <span className="font-mono font-bold text-terracotta">{formatCurrency(payload[0]?.value)}</span></p>
      <p className="text-stone">Donations: <span className="font-bold text-forest">{payload[1]?.value}</span></p>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color, isLoading }) {
  return (
    <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6">
      {isLoading ? <Skeleton.StatCard /> : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-card ${color} flex items-center justify-center`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <p className="font-mono font-bold text-display-md text-forest leading-none mb-1">{value}</p>
          <p className="text-body-sm font-semibold text-forest mb-0.5">{label}</p>
          {sub && <p className="text-tiny text-stone">{sub}</p>}
        </>
      )}
    </motion.div>
  )
}

export default function DashboardPage() {
  const { stats, isLoading: statsLoading } = useStats()
  const { donations, isLoading: donationsLoading } = useAdminDonations({ per_page: 8 })
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await exportDonationsCSV()
      toast.success('Export downloaded successfully.')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const pieData = stats ? [
    { name: 'Completed', value: stats.completed_donations || 0, key: 'completed' },
    { name: 'Pending',   value: stats.pending_donations   || 0, key: 'pending' },
    { name: 'Failed',    value: stats.failed_donations    || 0, key: 'failed' },
  ].filter((d) => d.value > 0) : []

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-heading-lg text-forest">Dashboard</h1>
          <p className="text-body-sm text-stone mt-1">Overview of donation activity</p>
        </div>
        <Button
          variant="secondary"
          size="md"
          isLoading={isExporting}
          loadingText="Exporting…"
          onClick={handleExport}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Export CSV
        </Button>
      </div>

      {/* Stat cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <StatCard icon={Heart}      label="Total Donations"    value={statsLoading ? '—' : (stats?.total_donations ?? 0).toLocaleString()}     sub="All time"                       color="bg-terracotta/10 text-terracotta" isLoading={statsLoading} />
        <StatCard icon={TrendingUp} label="Total Collected"    value={statsLoading ? '—' : formatCurrency(stats?.total_amount_collected ?? 0)} sub="Completed payments"             color="bg-success/10 text-success"       isLoading={statsLoading} />
        <StatCard icon={Clock}      label="Pending"            value={statsLoading ? '—' : (stats?.pending_donations   ?? 0).toLocaleString()}  sub="Awaiting confirmation"          color="bg-warning/10 text-warning"       isLoading={statsLoading} />
        <StatCard icon={XCircle}    label="Failed"             value={statsLoading ? '—' : (stats?.failed_donations    ?? 0).toLocaleString()}  sub="Not completed"                  color="bg-danger/10 text-danger"         isLoading={statsLoading} />
      </motion.div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Bar chart */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="lg:col-span-2 bg-white rounded-card shadow-sm-warm p-6">
          <h2 className="font-semibold text-body-md text-forest mb-6">Donations This Week</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#C8C2B8" strokeOpacity={0.5} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#8A8078' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8A8078' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(193,68,14,0.05)' }} />
              <Bar dataKey="amount" fill="#C1440E" radius={[4, 4, 0, 0]} name="Amount" />
              <Bar dataKey="count"  fill="#E8943A" radius={[4, 4, 0, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-card shadow-sm-warm p-6">
          <h2 className="font-semibold text-body-md text-forest mb-6">Status Breakdown</h2>
          {statsLoading ? (
            <div className="h-48 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
            </div>
          ) : pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="45%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry) => (
                    <Cell key={entry.key} fill={PIE_COLORS[entry.key]} />
                  ))}
                </Pie>
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-tiny text-stone">{v}</span>} />
                <Tooltip formatter={(v, n) => [v.toLocaleString(), n]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-48 flex items-center justify-center text-body-sm text-stone">No data yet</div>
          )}
        </motion.div>
      </div>

      {/* Recent donations table */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="bg-white rounded-card shadow-sm-warm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ash/50">
          <h2 className="font-semibold text-body-md text-forest">Recent Donations</h2>
          <Link to="/admin/donations" className="text-body-sm text-terracotta font-semibold hover:underline">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full" aria-label="Recent donations">
            <thead>
              <tr className="bg-ivory-dark border-b border-ash/50">
                {['Donor', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} scope="col" className="px-6 py-3 text-left text-tiny font-semibold text-stone uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donationsLoading ? (
                Array.from({ length: 5 }).map((_, i) => <Skeleton.TableRow key={i} />)
              ) : donations.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-body-sm text-stone">No donations yet.</td></tr>
              ) : (
                donations.map((d) => (
                  <tr key={d.id} className="border-b border-ash/30 hover:bg-ivory/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-terracotta font-bold text-tiny">{d.donor_name?.[0]?.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-body-sm font-semibold text-forest">{d.donor_name}</p>
                          <p className="text-tiny text-stone">{d.phone_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-body-sm text-forest">{formatCurrency(d.amount)}</td>
                    <td className="px-6 py-4"><StatusBadge status={d.payment_status} /></td>
                    <td className="px-6 py-4 text-body-sm text-stone">{formatDate(d.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
