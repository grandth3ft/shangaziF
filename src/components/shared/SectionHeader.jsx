import { useReducedMotion, motion } from 'framer-motion'
import { clsx } from '@/utils/clsx'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const CHILD = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const CHILD_REDUCED = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

const CONTAINER = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', theme = 'light', className }) {
  const { ref, isInView } = useScrollReveal()
  const reduced           = useReducedMotion()
  const isDark            = theme === 'dark'
  const child             = reduced ? CHILD_REDUCED : CHILD

  return (
    <motion.div
      ref={ref}
      variants={CONTAINER}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={clsx(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          variants={child}
          className={clsx(
            'text-tiny font-semibold tracking-widest uppercase',
            isDark ? 'text-amber' : 'text-terracotta',
          )}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={child}
        className={clsx(
          'font-display text-heading-lg md:text-display-md leading-tight',
          isDark ? 'text-white' : 'text-forest',
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={child}
          className={clsx(
            'text-body-lg leading-relaxed max-w-2xl',
            isDark ? 'text-white/70' : 'text-stone',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
