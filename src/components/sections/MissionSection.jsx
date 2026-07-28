import { useReducedMotion, motion } from 'framer-motion'
import { Shield, Lightbulb, Heart, Users } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations'

const VALUES = [
  { icon: Heart,     title: 'Compassion',   description: 'Every child is treated with dignity, love, and unconditional care — no child is left behind.',                                                  color: 'bg-terracotta/10 text-terracotta border-terracotta/20' },
  { icon: Shield,    title: 'Integrity',    description: 'Full transparency in how every shilling is used. We publish our impact and hold ourselves accountable.',                                       color: 'bg-forest/10 text-forest border-forest/20' },
  { icon: Lightbulb, title: 'Empowerment', description: 'We give children tools for independence — not dependency. Education and skills for a self-sufficient future.',                                 color: 'bg-amber/20 text-amber-600 border-amber/30' },
  { icon: Users,     title: 'Community',    description: 'Families and communities are partners in every intervention. Real change is built from within.',                                               color: 'bg-sage/10 text-sage border-sage/20' },
]

export default function MissionSection() {
  const { ref, isInView } = useScrollReveal()
  const reduced = useReducedMotion()

  return (
    <section id="mission" className="section bg-ivory" aria-label="Our mission and values">
      <div className="container-content">

        <SectionHeader
          eyebrow="Our Purpose"
          title="Built on Love, Driven by Impact"
          subtitle="Shangazi Foundation was founded on a simple belief: every child in Kenya deserves access to education, healthcare, and a safe home — regardless of their circumstances."
          className="mb-16"
        />

        {/* Mission + Vision */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div
            variants={reduced ? fadeInUp : fadeInLeft}
            className="relative p-8 rounded-soft bg-gradient-hero text-white overflow-hidden group"
          >
            {/* Decorative arc */}
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
            <div className="absolute -right-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" aria-hidden="true" />
            <div className="relative">
              <p className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Mission</p>
              <h3 className="font-display text-heading-md text-white mb-4 leading-snug">
                To nurture every vulnerable child into their fullest potential
              </h3>
              <p className="text-body-md text-white/70 leading-relaxed">
                Through holistic support — food, shelter, education, healthcare and mentorship —
                we walk alongside children and their families from crisis to confidence.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={reduced ? fadeInUp : fadeInRight}
            className="relative p-8 rounded-soft bg-ivory-dark border border-ash overflow-hidden group"
          >
            <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-terracotta/5 group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
            <div className="relative">
              <p className="text-tiny font-semibold tracking-widest uppercase text-terracotta mb-3">Vision</p>
              <h3 className="font-display text-heading-md text-forest mb-4 leading-snug">
                A Kenya where no child is left without hope or opportunity
              </h3>
              <p className="text-body-md text-stone leading-relaxed">
                We envision thriving communities where every child grows up safe, educated,
                healthy, and empowered to lead a dignified, fulfilling life.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Values grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {VALUES.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                custom={i}
                whileHover={reduced ? {} : { y: -4, transition: { duration: 0.25 } }}
                className={`group p-6 bg-white rounded-soft border shadow-sm-warm hover:shadow-md-warm transition-shadow duration-300 ${value.color.includes('border') ? '' : ''}`}
              >
                <div className={`w-12 h-12 rounded-card border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 ${value.color}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="font-display text-heading-md text-forest mb-2">{value.title}</h4>
                <p className="text-body-sm text-stone leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
