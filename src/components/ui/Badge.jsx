import { clsx } from '@/utils/clsx'

/**
 * Badge — status indicators and label chips.
 * Variant maps to donation payment_status values and general UI labels.
 */

const VARIANTS = {
  success:  'bg-success/10 text-success border border-success/20',
  warning:  'bg-warning/10 text-warning border border-warning/20',
  danger:   'bg-danger/10 text-danger border border-danger/20',
  info:     'bg-info/10 text-info border border-info/20',
  neutral:  'bg-stone/10 text-stone border border-stone/20',
  forest:   'bg-forest/10 text-forest border border-forest/20',
  amber:    'bg-amber/10 text-amber-600 border border-amber/30',
  terracotta: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
}

// Maps donation payment_status → badge variant
export const STATUS_VARIANT_MAP = {
  completed: 'success',
  pending:   'warning',
  failed:    'danger',
  cancelled: 'neutral',
}

export const STATUS_DOT_COLORS = {
  completed: 'bg-success',
  pending:   'bg-warning animate-pulse',
  failed:    'bg-danger',
  cancelled: 'bg-stone',
}

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold font-body',
        VARIANTS[variant],
        size === 'sm' ? 'px-2 py-0.5 text-tiny' : 'px-2.5 py-1 text-tiny',
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full flex-shrink-0',
            variant === 'success'  ? 'bg-success' :
            variant === 'warning'  ? 'bg-warning animate-pulse' :
            variant === 'danger'   ? 'bg-danger' :
            variant === 'info'     ? 'bg-info' :
            'bg-stone'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}

/**
 * Convenience component for donation payment status.
 */
export function StatusBadge({ status }) {
  const variant = STATUS_VARIANT_MAP[status] || 'neutral'
  const labels = {
    completed: 'Completed',
    pending:   'Pending',
    failed:    'Failed',
    cancelled: 'Cancelled',
  }

  return (
    <Badge variant={variant} dot>
      {labels[status] || status}
    </Badge>
  )
}
