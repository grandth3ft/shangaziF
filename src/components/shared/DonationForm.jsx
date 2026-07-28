import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { User, Phone, Heart } from 'lucide-react'
import { toast } from 'react-toastify'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useDonationStore } from '@/store/donationStore'
import { donationValidation } from '@/utils/validators'
import { PRESET_AMOUNTS, AMOUNT_IMPACT_MAP } from '@/utils/constants'
import { formatCurrency } from '@/utils/formatters'
import { clsx } from '@/utils/clsx'
import { staggerContainer, fadeInUp } from '@/utils/animations'

/**
 * DonationForm — complete donation form with:
 * - Preset amount selection
 * - Custom amount input
 * - Full name + phone fields
 * - Submits to useDonationStore → API
 */
export default function DonationForm({ defaultAmount = null }) {
  const [selectedPreset, setSelectedPreset] = useState(defaultAmount)
  const [isCustom, setIsCustom] = useState(!defaultAmount)

  const { initiateDonation } = useDonationStore()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      donor_name: '',
      phone_number: '',
      amount: defaultAmount || '',
    },
  })

  const watchedAmount = watch('amount')

  const handlePresetSelect = (amount) => {
    setSelectedPreset(amount)
    setIsCustom(false)
    setValue('amount', amount, { shouldValidate: true })
  }

  const handleCustomClick = () => {
    setSelectedPreset(null)
    setIsCustom(true)
    setValue('amount', '', { shouldValidate: false })
  }

  const onSubmit = async (data) => {
    try {
      await initiateDonation({
        donor_name: data.donor_name.trim(),
        phone_number: data.phone_number.trim(),
        amount: Number(data.amount),
      })
    } catch (err) {
      toast.error(err.message || 'Failed to initiate payment. Please try again.')
    }
  }

  const impactText = watchedAmount && AMOUNT_IMPACT_MAP[Number(watchedAmount)]

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Donation form"
    >
      {/* ── Amount Selection ── */}
      <motion.div variants={fadeInUp} className="mb-6">
        <p className="label-base mb-3">Choose an Amount</p>

        {/* Preset grid */}
        <div className="grid grid-cols-3 gap-2 mb-3" role="group" aria-label="Preset donation amounts">
          {PRESET_AMOUNTS.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handlePresetSelect(amount)}
              aria-pressed={selectedPreset === amount && !isCustom}
              className={clsx(
                'border-2 rounded-card px-3 py-3 text-center transition-all duration-200',
                'font-mono font-semibold text-body-sm cursor-pointer',
                selectedPreset === amount && !isCustom
                  ? 'border-terracotta bg-terracotta/10 text-terracotta'
                  : 'border-ash text-stone hover:border-terracotta hover:text-terracotta'
              )}
            >
              <span className="block text-tiny font-body font-normal text-stone/70 mb-0.5">KES</span>
              {amount.toLocaleString()}
            </button>
          ))}

          {/* Custom amount button */}
          <button
            type="button"
            onClick={handleCustomClick}
            aria-pressed={isCustom}
            className={clsx(
              'border-2 rounded-card px-3 py-3 text-center transition-all duration-200',
              'font-body font-semibold text-body-sm cursor-pointer',
              isCustom
                ? 'border-terracotta bg-terracotta/10 text-terracotta'
                : 'border-ash text-stone hover:border-terracotta hover:text-terracotta'
            )}
          >
            Custom
          </button>
        </div>

        {/* Custom amount input */}
        {isCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Input
              label="Custom Amount (KES)"
              type="number"
              inputMode="numeric"
              placeholder="Enter amount"
              error={errors.amount?.message}
              helperText="Minimum KES 10"
              leftIcon={<span className="text-body-sm font-semibold">KES</span>}
              {...register('amount', donationValidation.amount)}
            />
          </motion.div>
        )}

        {/* Hidden input for preset amounts */}
        {!isCustom && (
          <input
            type="hidden"
            {...register('amount', donationValidation.amount)}
          />
        )}

        {/* Impact message */}
        {impactText && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2 p-3 bg-sage/10 rounded-card border border-sage/20"
          >
            <Heart className="w-4 h-4 text-sage flex-shrink-0 fill-sage/30" aria-hidden="true" />
            <p className="text-body-sm text-sage font-medium">
              {formatCurrency(watchedAmount)} <span className="font-normal text-stone">— {impactText}</span>
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* ── Personal Details ── */}
      <motion.div variants={fadeInUp} className="space-y-4 mb-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Jane Wanjiku"
          autoComplete="name"
          required
          error={errors.donor_name?.message}
          leftIcon={<User className="w-4 h-4" />}
          {...register('donor_name', donationValidation.donor_name)}
        />

        <Input
          label="M-Pesa Phone Number"
          type="tel"
          inputMode="tel"
          placeholder="e.g. 0712 345 678"
          autoComplete="tel"
          required
          error={errors.phone_number?.message}
          helperText="The number that will receive the M-Pesa STK push"
          leftIcon={<Phone className="w-4 h-4" />}
          {...register('phone_number', donationValidation.phone_number)}
        />
      </motion.div>

      {/* ── Summary ── */}
      {watchedAmount && Number(watchedAmount) >= 10 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-ivory-dark rounded-card border border-ash"
        >
          <div className="flex items-center justify-between">
            <span className="text-body-sm text-stone">Donation total</span>
            <span className="font-mono font-bold text-heading-md text-forest">
              {formatCurrency(Number(watchedAmount))}
            </span>
          </div>
          <p className="text-tiny text-stone mt-1">
            Payment processed securely via M-Pesa
          </p>
        </motion.div>
      )}

      {/* ── Submit ── */}
      <motion.div variants={fadeInUp}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Initiating payment…"
          leftIcon={<Heart className="w-5 h-5 fill-white/80" />}
        >
          Donate via M-Pesa
        </Button>

        <p className="text-tiny text-stone text-center mt-3 flex items-center justify-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-success flex-shrink-0" aria-hidden="true" />
          Secured by Safaricom M-Pesa Daraja API
        </p>
      </motion.div>
    </motion.form>
  )
}
