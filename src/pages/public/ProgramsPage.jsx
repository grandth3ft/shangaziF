import { motion } from 'framer-motion'
import { BookOpen, Stethoscope, Utensils, Home, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '@/components/shared/SectionHeader'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const PROGRAMS = [
  { icon: BookOpen, title: 'Education', color: 'bg-forest text-white', description: 'We believe education is the single most powerful tool to lift a child out of poverty. Our education program covers school fees, uniforms, stationery, textbooks, and supplementary tutoring for over 320 children annually.', metrics: [{ label: 'Children in school', value: '320+' }, { label: 'School completion rate', value: '95%' }, { label: 'University alumni', value: '28' }] },
  { icon: Stethoscope, title: 'Healthcare', color: 'bg-terracotta text-white', description: 'Healthy children learn and grow better. Our healthcare program provides quarterly medical check-ups, full vaccination schedules, dental care, eye examinations, and emergency treatment — all free of charge.', metrics: [{ label: 'Vaccination coverage', value: '100%' }, { label: 'Medical visits annually', value: '1,200+' }, { label: 'Partner clinics', value: '5' }] },
  { icon: Utensils, title: 'Feeding Program', color: 'bg-amber text-white', description: 'No child can concentrate in class when they are hungry. We serve two nutritious, balanced meals every day of the year — breakfast and lunch — to all children in our program.', metrics: [{ label: 'Meals per month', value: '2,500+' }, { label: 'Days of service', value: '365' }, { label: 'Nutritional standards met', value: '100%' }] },
  { icon: Home, title: 'Shelter', color: 'bg-sage text-white', description: 'For children with no safe home, we provide clean, loving residential facilities managed by trained house parents. Every child has their own bed, clothing, and space to call home.', metrics: [{ label: 'Children housed', value: '80+' }, { label: 'House parents', value: '8' }, { label: 'Residential homes', value: '3' }] },
  { icon: Users, title: 'Mentorship', color: 'bg-forest text-white', description: 'Pairing children with successful professionals who invest in their futures — through career guidance, skill development, and life coaching. Our mentors come from medicine, law, tech, business, and the arts.', metrics: [{ label: 'Active mentors', value: '45' }, { label: 'Monthly sessions', value: '120+' }, { label: 'Career placements', value: '12' }] },
]

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">What We Do</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">Our Programs</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-2xl mx-auto">Five interconnected programs that address every dimension of a child's wellbeing — from their belly to their future.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        <div className="space-y-20">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon
            return (
              <motion.div key={program.title} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className={`w-14 h-14 rounded-soft ${program.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-display-md text-forest mb-4">{program.title}</h2>
                  <p className="text-body-lg text-stone leading-relaxed mb-8">{program.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {program.metrics.map((m) => (
                      <div key={m.label} className="bg-ivory-dark rounded-card p-4 text-center">
                        <p className="font-mono font-bold text-heading-md text-terracotta">{m.value}</p>
                        <p className="text-tiny text-stone mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/donate" className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta hover:underline group">
                    Support this program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className={`${i % 2 !== 0 ? 'lg:order-1' : ''} bg-gradient-hero rounded-soft aspect-card-img flex items-center justify-center`}>
                  <Icon className="w-32 h-32 text-white/20" aria-hidden="true" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
