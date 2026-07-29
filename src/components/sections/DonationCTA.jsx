import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, fadeInUp, scaleIn } from '@/utils/animations'
import { PRESET_AMOUNTS, AMOUNT_IMPACT_MAP } from '@/utils/constants'
import { formatCurrency } from '@/utils/formatters'

export default function DonationCTA() {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 })

  return (
    <section
      className="section bg-gradient-cta relative overflow-hidden"
      aria-label="Donate now"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 90%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(255,255,255,0.2) 0%, transparent 40%)'
        }}
        aria-hidden="true"
      />

      <div className="container-content relative">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={scaleIn} className="mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white fill-white/70" aria-hidden="true" />
            </div>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-white/70 mb-4">
            Change A Life Today
          </motion.p>

          <motion.h2 variants={fadeInUp} className="font-display text-heading-lg md:text-display-md text-white leading-tight mb-6">
            Your Donation Is the Difference Between a Child With Hope and One Without
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-body-lg text-white/80 mb-10 leading-relaxed">
            Every shilling goes directly to the children. No excessive overheads. No empty promises. 
            Just real impact, verified and shared openly.
          </motion.p>

          {/* Quick amount buttons */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 xs:flex xs:flex-wrap justify-center gap-3 mb-10">
            {[500, 1000, 2500, 5000].map((amount) => (
              <Link
                key={amount}
                to={`/donate?amount=${amount}`}
                className="group flex flex-col items-center px-4 sm:px-5 py-3 bg-white/20 hover:bg-white/25 border border-white/25 rounded-soft transition-all duration-200 backdrop-blur-sm"
              >
                <span className="font-mono font-bold text-white text-heading-md">
                  {formatCurrency(amount, false)}
                </span>
                <span className="text-tiny text-white/60 mt-0.5 text-center">
                  {AMOUNT_IMPACT_MAP[amount]}
                </span>
              </Link>
            ))}
          </motion.div>
          </motion.div>

          {/* Primary CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/donate"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-terracotta font-semibold text-body-md rounded-soft shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              <Heart className="w-5 h-5 fill-terracotta/30 group-hover:fill-terracotta/60 transition-colors" aria-hidden="true" />
              Donate Now
            </Link>
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-white font-semibold text-body-md hover:underline group"
            >
              See how it's used
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-tiny text-white/50 mt-8">
            Processed securely via M-Pesa · All donations acknowledged · Full transparency reports
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
