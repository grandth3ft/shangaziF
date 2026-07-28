import { motion } from 'framer-motion'
import SectionHeader from '@/components/shared/SectionHeader'
import StatCounter from '@/components/shared/StatCounter'
import StoryCard from '@/components/shared/StoryCard'
import { staggerContainer, fadeInUp } from '@/utils/animations'
import { IMPACT_STATS } from '@/utils/constants'

const STORIES = [
  { quote: "I came to Shangazi at age 7 with nothing. Today I am 19, in university studying engineering. I come back every holiday to mentor younger children.", name: "Brian Omondi", role: "Former beneficiary, now mentor", avatarInitials: "BO", avatarColor: "bg-forest" },
  { quote: "My mother passed away when I was 11. Shangazi became my family. They paid my school fees, clothed me, fed me, and celebrated every small win with me.", name: "Faith Njeri", role: "Form 4 student", avatarInitials: "FN", avatarColor: "bg-terracotta" },
  { quote: "We were five children and our father lost his job. Shangazi's feeding program kept us in school. We did not have to choose between eating and studying.", name: "Collins Mwangi", role: "Beneficiary family", avatarInitials: "CM", avatarColor: "bg-sage" },
]

const OUTCOMES = [
  { label: 'Children who completed secondary school', value: '280', suffix: '+' },
  { label: 'University graduates from our program', value: '28', suffix: '' },
  { label: 'Children placed in employment', value: '45', suffix: '+' },
  { label: 'Families lifted above poverty line', value: '60', suffix: '+' },
]

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Measurable Impact</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">Our Impact</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-2xl mx-auto">Numbers backed by stories. Outcomes driven by dedication. Here is what your support has made possible.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content space-y-20">
        <div>
          <SectionHeader eyebrow="By the Numbers" title="A Decade of Measurable Change" className="mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-6 bg-white rounded-soft shadow-sm-warm">
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} description={stat.description} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="Long-Term Outcomes" title="What Happens After Our Programs" className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTCOMES.map((o) => (
              <motion.div key={o.label} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gradient-hero rounded-soft p-6 text-center">
                <p className="font-mono font-bold text-display-md text-white">{o.value}{o.suffix}</p>
                <p className="text-body-sm text-white/70 mt-2">{o.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="Real Stories" title="Lives Changed, In Their Own Words" className="mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {STORIES.map((s) => (
              <motion.div key={s.name} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <StoryCard story={s} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
