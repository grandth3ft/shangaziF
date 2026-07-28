/**
 * Minimal clsx implementation — combines class names, filters falsy values.
 * Drop-in replacement for the clsx package since npm is unavailable.
 */
export function clsx(...args) {
  return args
    .flat(Infinity)
    .filter(Boolean)
    .join(' ')
    .trim()
}

export default clsx
