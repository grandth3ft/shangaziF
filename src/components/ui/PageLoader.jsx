import { useReducedMotion, motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function PageLoader({ message = 'Loading…' }) {
  const reduced = useReducedMotion()

  return (
    <div
      className="fixed inset-0 bg-ivory flex flex-col items-center justify-center z-modal gap-5"
      role="status"
      aria-label={message}
      aria-live="polite"
    >
      <div className="relative">
        {/* Outer ring pulse */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-full bg-terracotta/20"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
        <motion.div
          animate={reduced ? {} : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-16 h-16 rounded-full bg-gradient-cta flex items-center justify-center shadow-cta"
        >
          <Heart className="w-7 h-7 text-white fill-white/80" aria-hidden="true" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-body-sm font-semibold text-forest">{message}</p>
        <p className="text-tiny text-stone">Shangazi Foundation</p>
      </div>
    </div>
  )
}
