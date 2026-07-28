import { motion } from 'framer-motion'
import { Heart, Target, Eye, Calendar } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations'

const TIMELINE = [
  { year: '2012', title: 'Foundation Founded', desc: 'Shangazi Foundation was established with a mission to support 10 vulnerable children in Nairobi.' },
  { year: '2015', title: 'First Children\'s Home', desc: 'Opened our first residential home, providing safe shelter to 25 children without families.' },
  { year: '2018', title: 'Healthcare Program Launch', desc: 'Partnered with local clinics to provide free medical care to all beneficiaries.' },
  { year: '2020', title: 'Digital Donation Platform', desc: 'Launched M-Pesa online donations, making giving accessible to diaspora and local donors.' },
  { year: '2022', title: '500 Children Milestone', desc: 'Reached our most significant milestone — 500 children supported across all programs.' },
  { year: '2024', title: 'Mentorship Program', desc: 'Launched structured mentorship pairing children with professionals across Kenya.' },
]

const TEAM = [
  { name: 'Grace Achieng', role: 'Executive Director', initials: 'GA', color: 'bg-terracotta' },
  { name: 'John Kariuki', role: 'Programs Director', initials: 'JK', color: 'bg-forest' },
  { name: 'Fatuma Omar', role: 'Healthcare Lead', initials: 'FO', color: 'bg-sage' },
  { name: 'Peter Njoroge', role: 'Education Coordinator', initials: 'PN', color: 'bg-amber' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Who We Are</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">About Shangazi Foundation</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-2xl mx-auto">
              For over a decade, we have walked alongside Kenya's most vulnerable children — and we are not stopping.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="section-eyebrow mb-3">Our Story</p>
            <h2 className="font-display text-display-md text-forest mb-6 leading-tight">Born From Love, Built on Action</h2>
            <div className="space-y-4 text-body-md text-stone leading-relaxed">
              <p>Shangazi Foundation was founded in 2012 by a group of Nairobi professionals who saw children living on the streets and decided that seeing was not enough — they had to act.</p>
              <p>The name "Shangazi" means aunt in Swahili — the trusted family figure who steps in during hardship. It captures exactly what we aspire to be: not an institution, but a family to every child we serve.</p>
              <p>From those first 10 children, we have grown into a full-spectrum support organization serving over 500 children annually through education, healthcare, feeding, shelter, and mentorship programs.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'Children Supported', value: '500+', color: 'bg-terracotta text-white' }, { label: 'Years of Service', value: '12+', color: 'bg-forest text-white' }, { label: 'Staff & Volunteers', value: '60+', color: 'bg-sage text-white' }, { label: 'Partner Organizations', value: '15+', color: 'bg-amber text-white' }].map((s) => (
                <div key={s.label} className={`${s.color} rounded-soft p-6 text-center`}>
                  <p className="font-mono font-bold text-display-md">{s.value}</p>
                  <p className="text-body-sm opacity-80 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mb-24">
          <SectionHeader eyebrow="Our Journey" title="12 Years of Impact" className="mb-12" />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ash" aria-hidden="true" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-10 md:pl-0`}>
                    <div className="bg-white rounded-card shadow-sm-warm p-5">
                      <span className="font-mono font-bold text-terracotta text-body-sm">{item.year}</span>
                      <h3 className="font-display text-heading-md text-forest mt-1 mb-2">{item.title}</h3>
                      <p className="text-body-sm text-stone leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-5 w-8 h-8 rounded-full bg-terracotta border-4 border-ivory flex items-center justify-center md:-translate-x-1/2 z-10">
                    <Calendar className="w-3 h-3 text-white" aria-hidden="true" />
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeader eyebrow="The Team" title="The People Behind the Mission" subtitle="Our dedicated team brings together expertise in education, healthcare, social work, and community development." className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-soft shadow-sm-warm p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-heading-md">{member.initials}</span>
                </div>
                <h3 className="font-display text-heading-md text-forest mb-1">{member.name}</h3>
                <p className="text-body-sm text-stone">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
