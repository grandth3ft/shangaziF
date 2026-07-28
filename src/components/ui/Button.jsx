import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx } from '@/utils/clsx'

/**
 * Button component — all variants, sizes, states.
 *
 * Variants: primary | secondary | ghost | forest | white | outline-white | danger
 * Sizes: sm | md | lg
 */

const VARIANTS = {
  primary:       'bg-terracotta text-white hover:bg-terracotta-600 shadow-cta hover:shadow-cta-lg disabled:shadow-none',
  secondary:     'bg-transparent border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
  ghost:         'bg-transparent text-forest hover:bg-ivory-dark border border-transparent hover:border-ash',
  forest:        'bg-forest text-white hover:bg-forest-500 shadow-md-warm',
  white:         'bg-white text-forest hover:bg-ivory shadow-md-warm',
  'outline-white': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest',
  danger:        'bg-danger text-white hover:bg-danger-dark shadow-md',
  'ghost-danger': 'bg-transparent text-danger hover:bg-danger/10 border border-transparent hover:border-danger/30',
}

const SIZES = {
  sm: 'px-4 py-2 text-body-sm gap-1.5 rounded-card',
  md: 'px-6 py-3 text-body-sm gap-2 rounded-card',
  lg: 'px-8 py-4 text-body-md gap-2.5 rounded-soft',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    disabled,
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      className={clsx(
        // Base
        'inline-flex items-center justify-center font-body font-semibold',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta',
        // Variant
        VARIANTS[variant],
        // Size
        SIZES[size],
        // Full width
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          {loadingText || children}
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </motion.button>
  )
})

export default Button
