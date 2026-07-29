import { motion } from 'framer-motion'
import StatCounter from '@/components/shared/StatCounter'
import { IMPACT_STATS } from '@/utils/constants'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, fadeInUp } from '@/utils/animations'

export default function ImpactStats() {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 })

  return (
    <section className="section bg-gradient-hero relative overflow-hidden" aria-label="Our impact in numbers">
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #E8943A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4A7C59 0%, transparent 50%)'
        }}
        aria-hidden="true"
      />

      <div className="container-content relative">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <p className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">
              Our Impact
            </p>
            <h2 className="font-display text-heading-lg md:text-display-md text-white leading-tight">
              Numbers That Represent Real Lives
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {IMPACT_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  description={stat.description}
                  theme="dark"
                  size="lg"
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 text-center max-w-2xl mx-auto px-4"
          >
            <p className="text-base sm:text-body-lg text-white/60 italic leading-relaxed">
              "Behind every number is a child who now has hope, a future, and someone who believed in them."
            </p>
            <p className="text-body-sm text-white/40 mt-3">— Shangazi Foundation Team</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
