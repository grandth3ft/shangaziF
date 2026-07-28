import { forwardRef } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { clsx } from '@/utils/clsx'

/**
 * Input component — wraps label, input, error/helper text.
 * Designed for use with React Hook Form via `register` spread.
 *
 * @example
 * <Input
 *   label="Full Name"
 *   placeholder="John Kamau"
 *   error={errors.name?.message}
 *   {...register('name')}
 * />
 */
const Input = forwardRef(function Input(
  {
    label,
    error,
    success,
    helperText,
    leftIcon,
    rightIcon,
    className,
    containerClassName,
    required,
    id,
    name,
    ...props
  },
  ref
) {
  const inputId = id || name

  return (
    <div className={clsx('flex flex-col gap-0', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="label-base mb-1.5"
        >
          {label}
          {required && (
            <span className="text-terracotta ml-0.5" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone pointer-events-none" aria-hidden="true">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` :
            helperText ? `${inputId}-helper` :
            undefined
          }
          className={clsx(
            // Base styles
            'w-full font-body text-body-md text-forest',
            'bg-white border rounded-card px-4 py-3',
            'placeholder:text-stone/60',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2',
            'disabled:bg-ivory-dark disabled:cursor-not-allowed disabled:text-stone',
            // Icon padding
            leftIcon && 'pl-10',
            (rightIcon || error || success) && 'pr-10',
            // State styles
            error
              ? 'border-danger focus:border-danger focus:ring-danger/20'
              : success
              ? 'border-success focus:border-success focus:ring-success/20'
              : 'border-ash focus:border-terracotta focus:ring-terracotta/20 hover:border-stone',
            className
          )}
          {...props}
        />

        {/* Right icon / state indicator */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          {error ? (
            <AlertCircle className="w-4 h-4 text-danger" />
          ) : success ? (
            <CheckCircle2 className="w-4 h-4 text-success" />
          ) : rightIcon ? (
            <span className="text-stone">{rightIcon}</span>
          ) : null}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-tiny text-danger mt-1.5 font-medium"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {/* Helper text (only shown when no error) */}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="text-tiny text-stone mt-1.5"
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

export default Input
