import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Heart, Users, CheckCircle2, Phone } from 'lucide-react'
import DonationForm from '@/components/shared/DonationForm'
import DonationStatus from '@/components/shared/DonationStatus'
import { useDonationStore } from '@/store/donationStore'
import { AMOUNT_IMPACT_MAP, PRESET_AMOUNTS } from '@/utils/constants'
import { formatCurrency } from '@/utils/formatters'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations'

const TRUST_SIGNALS = [
  { icon: Shield, title: 'Secured by M-Pesa', description: "Payments are processed by Safaricom's Daraja API — Kenya's most trusted mobile payment system." },
  { icon: Heart, title: '100% Goes to Children', description: 'Every shilling of your donation is used for child welfare programs. We publish annual transparency reports.' },
  { icon: Users, title: 'Join 2,000+ Donors', description: 'Be part of a growing community of Kenyans and diaspora committed to giving every child a chance.' },
]

const FAQ = [
  { q: 'Is my donation secure?', a: "Yes. All payments are processed by Safaricom's official Daraja M-Pesa API. We never store your PIN or financial details." },
  { q: 'Will I get a receipt?', a: "Yes. You'll receive an M-Pesa confirmation SMS from Safaricom, and our platform will display your receipt number after payment." },
  { q: 'Can I donate as a company?', a: 'Absolutely. Contact us at info@shangazifoundation.org to discuss corporate giving and partnership opportunities.' },
  { q: 'Is there a minimum donation?', a: 'The minimum is KES 10. Every amount matters — even a small regular donation creates lasting change.' },
]

export default function DonatePage() {
  const [searchParams] = useSearchParams()
  const preAmount = searchParams.get('amount')
  const { step } = useDonationStore()
  const showForm = step === 'form'

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Make a Difference</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">Donate Today</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-xl mx-auto">A safe, simple M-Pesa donation that goes directly to the children who need it most.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container-content py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div variants={fadeInLeft} initial="hidden" animate="visible">
            <div className="bg-white rounded-soft shadow-lg-warm p-6 md:p-8">
              {showForm ? (
                <>
                  <div className="mb-6">
                    <h2 className="font-display text-heading-lg text-forest mb-2">Your Donation</h2>
                    <p className="text-body-sm text-stone">Fill in your details below. An M-Pesa prompt will be sent to your phone.</p>
                  </div>
                  <DonationForm defaultAmount={preAmount ? Number(preAmount) : null} />
                </>
              ) : (
                <DonationStatus />
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} initial="hidden" animate="visible" className="space-y-6">
            <div className="bg-white rounded-soft shadow-sm-warm p-6">
              <h3 className="font-display text-heading-md text-forest mb-4">What Your Donation Does</h3>
              <div className="space-y-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <div key={amount} className="flex items-start gap-3 py-2 border-b border-ash/50 last:border-0">
                    <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="font-mono font-bold text-body-sm text-terracotta">{formatCurrency(amount)}</span>
                      <span className="text-body-sm text-stone ml-2">{AMOUNT_IMPACT_MAP[amount]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {TRUST_SIGNALS.map((signal) => {
              const Icon = signal.icon
              return (
                <div key={signal.title} className="flex items-start gap-4 p-4 bg-white rounded-card shadow-sm-warm">
                  <div className="w-10 h-10 rounded-card bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-terracotta" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-body-sm text-forest mb-1">{signal.title}</h4>
                    <p className="text-body-sm text-stone leading-relaxed">{signal.description}</p>
                  </div>
                </div>
              )
            })}

            <div className="bg-forest rounded-soft p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-amber" aria-hidden="true" />
                <h3 className="font-semibold text-body-md">How M-Pesa Donation Works</h3>
              </div>
              <ol className="space-y-3">
                {['Fill in your name, phone number, and amount','Click "Donate via M-Pesa"','An STK push is sent to your phone','Enter your M-Pesa PIN to confirm','Receive your instant confirmation'].map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-sm text-white/80">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-tiny text-white">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="font-display text-heading-lg text-forest text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white rounded-card shadow-sm-warm p-5 cursor-pointer">
                <summary className="font-semibold text-body-md text-forest flex items-center justify-between list-none">
                  {item.q}
                  <span className="text-stone group-open:rotate-180 transition-transform duration-200 ml-4 flex-shrink-0">▾</span>
                </summary>
                <p className="text-body-sm text-stone mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
