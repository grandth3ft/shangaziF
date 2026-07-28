import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Stethoscope, Utensils, Home, Users, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import ProgramCard from '@/components/shared/ProgramCard'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const PROGRAMS = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Sponsoring school fees, uniforms, books, and tutoring for children who would otherwise be out of school.',
    metric: '320+',
    metricLabel: 'children in school',
    color: 'bg-gradient-forest',
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Regular medical check-ups, vaccinations, dental care, and emergency treatment for all children in our program.',
    metric: '100%',
    metricLabel: 'vaccination coverage',
    color: 'bg-gradient-cta',
  },
  {
    icon: Utensils,
    title: 'Feeding Program',
    description: 'Two nutritious meals a day, seven days a week — because a hungry child cannot learn or grow.',
    metric: '2,500+',
    metricLabel: 'meals served monthly',
    color: 'bg-gradient-amber',
  },
  {
    icon: Home,
    title: 'Shelter',
    description: 'Safe, clean housing for children without families, supported by house parents who provide stability and love.',
    metric: '80+',
    metricLabel: 'children housed',
    color: 'bg-gradient-forest',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'One-on-one mentorship pairing children with professionals who invest in their dreams and guide their path.',
    metric: '45',
    metricLabel: 'active mentors',
    color: 'bg-gradient-cta',
  },
]

export default function ProgramsSection() {
  return (
    <section className="section bg-ivory-dark" aria-label="Our programs">
      <div className="container-content">
        <SectionHeader
          eyebrow="What We Do"
          title="Programs That Transform Lives"
          subtitle="Each program is designed to address a specific, critical need — together they create a comprehensive safety net for every child we serve."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROGRAMS.map((program) => (
            <motion.div key={program.title} variants={fadeInUp}>
              <ProgramCard program={program} />
            </motion.div>
          ))}

          {/* Community CTA card */}
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-hero rounded-soft p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Get Involved</p>
              <h3 className="font-display text-heading-md text-white mb-4">
                Want to Make a Direct Difference?
              </h3>
              <p className="text-body-sm text-white/70 leading-relaxed mb-6">
                Whether through donations, volunteering, or partnerships — there are many ways to support our children.
              </p>
            </div>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest font-semibold text-body-sm rounded-card hover:bg-ivory transition-colors duration-200 self-start group"
            >
              Start Donating
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* View all programs link */}
        <div className="text-center mt-12">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta group hover:underline"
          >
            View all programs in detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
