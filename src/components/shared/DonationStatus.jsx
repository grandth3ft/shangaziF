import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Smartphone, RefreshCw, Heart, Share2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useDonationStore } from '@/store/donationStore'
import { useDonationStatus } from '@/hooks/useDonationStatus'
import { formatCurrency, formatDateTime } from '@/utils/formatters'
import { DotSpinner } from '@/components/ui/Spinner'
import { successContainer, successIcon, staggerContainer, fadeInUp } from '@/utils/animations'

export default function DonationStatus() {
  useDonationStatus()
  const { step, amount, donorName, receiptNumber, error, reset } = useDonationStore()

  return (
    <AnimatePresence mode="wait">
      {step === 'pending' && <PendingState key="pending" />}
      {step === 'success' && (
        <SuccessState key="success" amount={amount} donorName={donorName} receiptNumber={receiptNumber} onDonateAgain={reset} />
      )}
      {step === 'failed' && <FailedState key="failed" error={error} onRetry={reset} />}
    </AnimatePresence>
  )
}

/* ── Pending ─────────────────────────────────────────────────────────────── */
function PendingState() {
  const { pollCount } = useDonationStore()
  const reduced       = useReducedMotion()
  const progress      = Math.min((pollCount / 20) * 100, 95)
  const elapsed       = pollCount * 3

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96 }}
      className="flex flex-col items-center text-center py-10 px-4"
    >
      {/* Pulsing phone icon */}
      <motion.div variants={fadeInUp} className="relative mb-10">
        {/* Rings */}
        {!reduced && [1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border-2 border-terracotta/30"
            animate={{ scale: [1, 1.6 + ring * 0.3], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: ring * 0.5, ease: 'easeOut' }}
            aria-hidden="true"
          />
        ))}
        <div className="relative w-20 h-20 rounded-full bg-terracotta/10 border-2 border-terracotta/20 flex items-center justify-center">
          <motion.div
            animate={reduced ? {} : { rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.5 }}
          >
            <Smartphone className="w-9 h-9 text-terracotta" aria-hidden="true" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h3 variants={fadeInUp} className="font-display text-heading-lg text-forest mb-3">
        Check Your Phone
      </motion.h3>
      <motion.p variants={fadeInUp} className="text-body-md text-stone mb-2 max-w-xs leading-relaxed">
        An M-Pesa request has been sent. Enter your{' '}
        <span className="font-semibold text-forest">M-Pesa PIN</span> to complete.
      </motion.p>
      <motion.p variants={fadeInUp} className="text-body-sm text-stone/60 mb-8">
        {elapsed < 60 ? `${elapsed}s elapsed` : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s elapsed`}
      </motion.p>

      <motion.div variants={fadeInUp} className="mb-10">
        <DotSpinner color="terracotta" size="md" />
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={fadeInUp} className="w-full max-w-xs">
        <div className="flex justify-between text-tiny text-stone mb-1.5">
          <span>Awaiting confirmation</span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-ash/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-cta"
            initial={{ width: '2%' }}
            animate={{ width: `${Math.max(progress, 2)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-tiny text-stone/50 text-center mt-2">Do not close this window</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Success ─────────────────────────────────────────────────────────────── */
function SuccessState({ amount, donorName, receiptNumber, onDonateAgain }) {
  const reduced   = useReducedMotion()
  const firstName = donorName?.split(' ')[0] || 'Friend'

  const handleShare = async () => {
    const text = `I just donated ${formatCurrency(amount)} to Shangazi Foundation to support vulnerable children in Kenya. Join me! shangazifoundation.org/donate`
    if (navigator.share) {
      await navigator.share({ text, url: 'https://shangazifoundation.org/donate' })
    } else {
      await navigator.clipboard?.writeText(text)
    }
  }

  return (
    <motion.div
      variants={successContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96 }}
      className="flex flex-col items-center text-center py-10 px-4"
    >
      {/* Success icon + burst */}
      <motion.div variants={successIcon} className="relative mb-8">
        {!reduced && [...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? '#C1440E' : '#E8943A',
              top: '50%', left: '50%',
              marginTop: -4, marginLeft: -4,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 8) * 56,
              y: Math.sin((i * Math.PI * 2) / 8) * 56,
              opacity: 0,
              scale: 0.4,
            }}
            transition={{ duration: 0.75, delay: 0.25, ease: 'easeOut' }}
            aria-hidden="true"
          />
        ))}
        <div className="w-24 h-24 rounded-full bg-success/10 border-2 border-success/25 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-success" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-success mb-2">
        Payment Confirmed
      </motion.p>
      <motion.h3 variants={fadeInUp} className="font-display text-heading-lg text-forest mb-2">
        Asante sana, {firstName}! 🙏
      </motion.h3>
      <motion.p variants={fadeInUp} className="text-body-md text-stone mb-8 max-w-xs leading-relaxed">
        Your generous gift makes a real difference in a child's life today.
      </motion.p>

      {/* Receipt card */}
      <motion.div
        variants={fadeInUp}
        className="w-full max-w-xs bg-ivory-dark border border-ash rounded-soft p-5 mb-8 text-left"
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ash">
          <Heart className="w-4 h-4 text-terracotta fill-terracotta/40" aria-hidden="true" />
          <span className="text-body-sm font-semibold text-forest">Donation Receipt</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-stone">Donor</span>
            <span className="text-body-sm font-medium text-forest">{donorName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-body-sm text-stone">Amount</span>
            <span className="font-mono font-bold text-heading-md text-forest">{formatCurrency(amount)}</span>
          </div>
          {receiptNumber && (
            <div className="flex justify-between items-start pt-3 border-t border-ash">
              <span className="text-tiny text-stone">M-Pesa Ref</span>
              <span className="font-mono text-tiny font-bold text-forest text-right ml-4 break-all">{receiptNumber}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3 w-full max-w-xs">
        <Button variant="primary" size="md" fullWidth onClick={onDonateAgain} leftIcon={<Heart className="w-4 h-4 fill-white/70" />}>
          Donate Again
        </Button>
        <Button variant="ghost" size="md" fullWidth onClick={handleShare} leftIcon={<Share2 className="w-4 h-4" />}>
          Share Your Impact
        </Button>
      </motion.div>
    </motion.div>
  )
}

/* ── Failed ──────────────────────────────────────────────────────────────── */
function FailedState({ error, onRetry }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96 }}
      className="flex flex-col items-center text-center py-10 px-4"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <div className="w-20 h-20 rounded-full bg-danger/10 border-2 border-danger/20 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-danger" aria-hidden="true" />
        </div>
      </motion.div>

      <motion.h3 variants={fadeInUp} className="font-display text-heading-lg text-forest mb-2">
        Payment Not Completed
      </motion.h3>
      <motion.p variants={fadeInUp} className="text-body-md text-stone mb-3 max-w-xs leading-relaxed">
        {error || "We couldn't confirm your payment. No charges were made to your account."}
      </motion.p>
      <motion.div variants={fadeInUp} className="bg-ivory-dark rounded-card px-4 py-3 mb-8 max-w-xs">
        <p className="text-body-sm text-stone/70 leading-relaxed">
          Please check your M-Pesa PIN was correct and your balance is sufficient, then try again.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-col gap-3 w-full max-w-xs">
        <Button variant="primary" size="md" fullWidth onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
        <Button variant="ghost" size="md" fullWidth onClick={() => window.location.href = '/contact'}>
          Contact Support
        </Button>
      </motion.div>
    </motion.div>
  )
}
