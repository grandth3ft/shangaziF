import { useReducedMotion, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProgramCard({ program }) {
  const { icon: Icon, title, description, metric, metricLabel, color } = program
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial="rest"
      whileHover={reduced ? undefined : 'hover'}
      animate="rest"
      variants={{
        rest:  { y: 0,  boxShadow: '0 2px 8px rgba(26,58,42,0.06)', transition: { duration: 0.25 } },
        hover: { y: -6, boxShadow: '0 12px 40px rgba(26,58,42,0.16)', transition: { duration: 0.3 } },
      }}
      className="group bg-white rounded-soft overflow-hidden flex flex-col"
    >
      {/* Image / color block */}
      <div className={`relative h-52 overflow-hidden ${color || 'bg-gradient-forest'} flex items-center justify-center`}>
        {Icon && (
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
            transition={{ duration: 0.4 }}
          >
            <Icon className="w-20 h-20 text-white/25" aria-hidden="true" />
          </motion.div>
        )}
        {/* Overlay shimmer on hover */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />

        {/* Icon badge bottom-left */}
        {Icon && (
          <div className="absolute bottom-4 left-4 w-10 h-10 rounded-card bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-heading-md text-forest mb-2 group-hover:text-terracotta transition-colors duration-200">
          {title}
        </h3>
        <p className="text-body-sm text-stone leading-relaxed flex-1 mb-5">{description}</p>

        {/* Metric pill */}
        {metric && (
          <div className="flex items-center gap-2 py-2.5 px-4 bg-ivory-dark rounded-card mb-5 w-fit">
            <span className="font-mono font-bold text-heading-md text-terracotta leading-none">{metric}</span>
            <span className="text-body-sm text-stone">{metricLabel}</span>
          </div>
        )}

        <Link
          to="/programs"
          className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-terracotta group/link"
          aria-label={`Learn more about ${title}`}
        >
          Learn more
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  )
}
