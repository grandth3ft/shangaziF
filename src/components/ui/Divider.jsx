import { clsx } from '@/utils/clsx'

/**
 * Divider — horizontal rule with optional label.
 */
export default function Divider({ label, className, variant = 'default' }) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-4', className)}>
        <div className={clsx(
          'flex-1 border-t',
          variant === 'warm' ? 'border-ivory-darker' : 'border-ash'
        )} aria-hidden="true" />
        <span className="text-tiny font-medium text-stone uppercase tracking-wider flex-shrink-0">
          {label}
        </span>
        <div className={clsx(
          'flex-1 border-t',
          variant === 'warm' ? 'border-ivory-darker' : 'border-ash'
        )} aria-hidden="true" />
      </div>
    )
  }

  return (
    <hr
      className={clsx(
        'border-t',
        variant === 'warm' ? 'border-ivory-darker' : 'border-ash',
        className
      )}
      aria-hidden="true"
    />
  )
}
