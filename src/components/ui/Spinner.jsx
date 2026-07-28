import { motion } from 'framer-motion'
import { clsx } from '@/utils/clsx'

/**
 * Spinner — inline loading indicator.
 * Variants: spin (border) | pulse (dots) | heart (brand)
 */

const SIZES = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
}

const COLORS = {
  terracotta: 'border-terracotta',
  forest:     'border-forest',
  white:      'border-white',
  stone:      'border-stone',
}

export function Spinner({ size = 'md', color = 'terracotta', className }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'rounded-full border-2 border-transparent animate-spin',
        SIZES[size],
        COLORS[color],
        // Only top border shows — creates spinning arc
        color === 'terracotta' && 'border-t-terracotta border-r-terracotta/30 border-b-terracotta/10 border-l-terracotta/30',
        color === 'forest'     && 'border-t-forest border-r-forest/30 border-b-forest/10 border-l-forest/30',
        color === 'white'      && 'border-t-white border-r-white/30 border-b-white/10 border-l-white/30',
        color === 'stone'      && 'border-t-stone border-r-stone/30 border-b-stone/10 border-l-stone/30',
        className
      )}
    >
      <span className="sr-only">Loading…</span>
    </div>
  )
}

/**
 * Dot pulse spinner — 3 bouncing dots.
 */
export function DotSpinner({ color = 'terracotta', size = 'md' }) {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'
  const bgColor = color === 'white' ? 'bg-white' : color === 'forest' ? 'bg-forest' : 'bg-terracotta'

  return (
    <div role="status" aria-label="Loading" className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={clsx('rounded-full', dotSize, bgColor)}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default Spinner
