import { forwardRef } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { clsx } from '@/utils/clsx'

/**
 * Select — styled native select with custom chevron.
 * Works with React Hook Form register spread.
 */
const Select = forwardRef(function Select(
  {
    label,
    options = [],
    placeholder,
    error,
    helperText,
    required,
    className,
    containerClassName,
    id,
    name,
    ...props
  },
  ref
) {
  const selectId = id || name

  return (
    <div className={clsx('flex flex-col', containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="label-base mb-1.5">
          {label}
          {required && <span className="text-terracotta ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          className={clsx(
            'w-full appearance-none font-body text-body-md text-forest',
            'bg-white border rounded-card px-4 py-3 pr-10',
            'transition-all duration-200 cursor-pointer',
            'focus:outline-none focus:ring-2',
            'disabled:bg-ivory-dark disabled:cursor-not-allowed',
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : 'border-ash focus:border-terracotta focus:ring-terracotta/20 hover:border-stone',
            !props.value && !props.defaultValue && 'text-stone/60',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          {error
            ? <AlertCircle className="w-4 h-4 text-danger" />
            : <ChevronDown className="w-4 h-4 text-stone" />
          }
        </div>
      </div>

      {error && (
        <p id={`${selectId}-error`} role="alert" className="flex items-center gap-1.5 text-tiny text-danger mt-1.5 font-medium">
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="text-tiny text-stone mt-1.5">
          {helperText}
        </p>
      )}
    </div>
  )
})

export default Select
