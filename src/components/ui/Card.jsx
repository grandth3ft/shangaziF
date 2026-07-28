import { motion } from 'framer-motion'
import { clsx } from '@/utils/clsx'
import { cardHover } from '@/utils/animations'

/**
 * Card — base card container.
 * Use Card.Hover for interactive hover-lift cards.
 */

function Card({ children, className, padding = 'md', ...props }) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  }

  return (
    <div
      className={clsx(
        'bg-white rounded-card shadow-sm-warm',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card.Hover — lifts on hover with Framer Motion.
 */
function CardHover({ children, className, padding = 'md', ...props }) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={clsx(
        'bg-white rounded-card cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Card.Soft — muted ivory background, no shadow. For stat boxes, highlights.
 */
function CardSoft({ children, className, padding = 'md', ...props }) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  }

  return (
    <div
      className={clsx(
        'bg-ivory-dark rounded-soft',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card.Glass — glassmorphism card. Use on dark/image backgrounds.
 */
function CardGlass({ children, className, padding = 'md', dark = false, ...props }) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  }

  return (
    <div
      className={clsx(
        'rounded-card border',
        dark
          ? 'backdrop-blur-md bg-forest/80 border-white/10'
          : 'backdrop-blur-md bg-white/80 border-white/20',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Hover  = CardHover
Card.Soft   = CardSoft
Card.Glass  = CardGlass

export default Card
