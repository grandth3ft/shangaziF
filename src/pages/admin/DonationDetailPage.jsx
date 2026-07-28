import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Phone, CreditCard, Calendar, Hash, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { getDonation } from '@/api/admin'
import { formatCurrency, formatDateTime, formatPhone } from '@/utils/formatters'
import { StatusBadge } from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { staggerContainer, fadeInUp } from '@/utils/animations'

function DetailRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-ash/50 last:border-0">
      <div className="w-9 h-9 rounded-card bg-ivory-dark flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-stone" aria-hidden="true" />
      </div>
      <div>
        <p className="text-tiny font-semibold text-stone uppercase tracking-wider mb-0.5">{label}</p>
        <p className={`text-body-md text-forest ${mono ? 'font-mono font-semibold' : 'font-medium'}`}>{value || '—'}</p>
      </div>
    </div>
  )
}

const STATUS_ICON = { completed: CheckCircle2, pending: Clock, failed: XCircle, cancelled: XCircle }
const STATUS_COLOR = { completed: 'text-success', pending: 'text-warning', failed: 'text-danger', cancelled: 'text-stone' }

export default function DonationDetailPage() {
  const { id } = useParams()
  const [donation, setDonation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      try {
        const data = await getDonation(id)
        setDonation(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
  }, [id])

  if (error) {
    return (
      <div className="p-8">
        <Link to="/admin/donations" className="inline-flex items-center gap-2 text-body-sm text-terracotta font-semibold hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Donations
        </Link>
        <div className="bg-danger/10 border border-danger/20 rounded-card p-6 text-danger text-body-sm">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <Link to="/admin/donations" className="inline-flex items-center gap-2 text-body-sm text-terracotta font-semibold hover:underline mb-8">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to Donations
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-card" />
        </div>
      ) : donation ? (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={fadeInUp} className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-tiny font-semibold text-stone uppercase tracking-wider mb-1">Donation #{donation.id}</p>
              <h1 className="font-display text-heading-lg text-forest">{donation.donor_name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={donation.payment_status} />
              {(() => {
                const Icon = STATUS_ICON[donation.payment_status] || Clock
                return <Icon className={`w-5 h-5 ${STATUS_COLOR[donation.payment_status] || 'text-stone'}`} aria-hidden="true" />
              })()}
            </div>
          </motion.div>

          {/* Amount hero */}
          <motion.div variants={fadeInUp} className="bg-gradient-hero rounded-soft p-8 text-center mb-6">
            <p className="text-tiny font-semibold tracking-widest uppercase text-white/60 mb-2">Donation Amount</p>
            <p className="font-mono font-bold text-display-lg text-white">{formatCurrency(donation.amount)}</p>
          </motion.div>

          {/* Details card */}
          <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6 mb-6">
            <h2 className="font-semibold text-body-md text-forest mb-2">Donor Information</h2>
            <DetailRow icon={User}     label="Full Name"    value={donation.donor_name} />
            <DetailRow icon={Phone}    label="Phone Number" value={formatPhone(donation.phone_number)} mono />
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6">
            <h2 className="font-semibold text-body-md text-forest mb-2">Transaction Details</h2>
            <DetailRow icon={CreditCard} label="M-Pesa Receipt"      value={donation.mpesa_receipt_number}    mono />
            <DetailRow icon={Hash}       label="Checkout Request ID"  value={donation.checkout_request_id}     mono />
            <DetailRow icon={Hash}       label="Merchant Request ID"  value={donation.merchant_request_id}     mono />
            <DetailRow icon={Calendar}   label="Initiated At"         value={formatDateTime(donation.created_at)} />
            {donation.updated_at && donation.updated_at !== donation.created_at && (
              <DetailRow icon={Calendar} label="Last Updated"         value={formatDateTime(donation.updated_at)} />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  )
}
