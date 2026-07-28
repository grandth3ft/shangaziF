import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const PARTNERS = [
  { name: 'Safaricom Foundation', abbr: 'SF' },
  { name: 'Kenya Red Cross', abbr: 'KRC' },
  { name: 'UNICEF Kenya', abbr: 'UN' },
  { name: 'Equity Bank Foundation', abbr: 'EBF' },
  { name: 'Kenya Community Development Foundation', abbr: 'KCDF' },
  { name: 'Rockefeller Foundation', abbr: 'RF' },
]

export default function PartnersSection() {
  return (
    <section className="section-sm bg-white border-t border-ash/50" aria-label="Our partners">
      <div className="container-content">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeInUp}
            className="text-center text-tiny font-semibold tracking-widest uppercase text-stone mb-8"
          >
            Trusted Partners & Supporters
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="group flex items-center gap-2 px-4 py-2 rounded-card border border-ash hover:border-stone/50 transition-colors duration-200"
                title={partner.name}
              >
                <div className="w-7 h-7 rounded-full bg-ivory-dark flex items-center justify-center flex-shrink-0">
                  <span className="text-tiny font-bold text-stone group-hover:text-forest transition-colors">
                    {partner.abbr}
                  </span>
                </div>
                <span className="text-body-sm text-stone group-hover:text-forest transition-colors font-medium hidden sm:block">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
