import { useRef } from 'react'
import { useReducedMotion, useInView } from 'framer-motion'

/**
 * useScrollReveal — triggers animation when element enters viewport.
 * Respects prefers-reduced-motion: returns isInView=true immediately
 * so content is always visible even without animation.
 *
 * @param {{ amount?: number, once?: boolean }} options
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export function useScrollReveal(options = {}) {
  const ref     = useRef(null)
  const reduced = useReducedMotion()

  const isInView = useInView(ref, {
    amount: options.amount ?? 0.18,
    once:   options.once   ?? true,
  })

  // If user prefers reduced motion, always treat as in view
  return { ref, isInView: reduced ? true : isInView }
}
