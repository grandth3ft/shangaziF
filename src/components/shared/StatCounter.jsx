import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useInView, useReducedMotion } from 'framer-motion'
import { clsx } from '@/utils/clsx'

/**
 * StatCounter — animated spring number counter.
 * Respects prefers-reduced-motion (shows final value instantly).
 */
export default function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  description,
  theme = 'light',
  size = 'md',
  className,
}) {
  const ref        = useRef(null)
  const displayRef = useRef(null)
  const isInView   = useInView(ref, { once: true, amount: 0.5 })
  const reduced    = useReducedMotion()

  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 55, damping: 18, restDelta: 0.5 })

  /* Drive the spring */
  useEffect(() => {
    if (!isInView) return
    if (reduced) {
      // Skip animation — show final value immediately
      if (displayRef.current) {
        displayRef.current.textContent = prefix + value.toLocaleString() + suffix
      }
      return
    }
    motionValue.set(value)
  }, [isInView, reduced, value, motionValue, prefix, suffix])

  /* Update DOM text on each spring tick */
  useEffect(() => {
    if (reduced) return
    const unsub = springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = prefix + Math.round(latest).toLocaleString() + suffix
      }
    })
    return unsub
  }, [springValue, prefix, suffix, reduced])

  const isDark   = theme === 'dark'
  const isLarge  = size === 'lg'

  return (
    <div ref={ref} className={clsx('flex flex-col', className)}>
      <span
        ref={displayRef}
        className={clsx(
          'font-mono font-bold leading-none tabular-nums',
          isLarge ? 'text-display-lg' : 'text-display-md',
          isDark  ? 'text-white'      : 'text-forest',
        )}
        aria-label={`${prefix}${value.toLocaleString()}${suffix} ${label}`}
      >
        {/* Initial value shown before JS kicks in */}
        {reduced ? `${prefix}${value.toLocaleString()}${suffix}` : `${prefix}0${suffix}`}
      </span>

      {label && (
        <span className={clsx(
          'font-body font-semibold text-body-md mt-2',
          isDark ? 'text-white/80' : 'text-forest',
        )}>
          {label}
        </span>
      )}

      {description && (
        <span className={clsx(
          'text-body-sm mt-1 leading-snug',
          isDark ? 'text-white/50' : 'text-stone',
        )}>
          {description}
        </span>
      )}
    </div>
  )
}
