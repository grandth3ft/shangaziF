/**
 * Format amount as KES currency string.
 * @param {number} amount
 * @param {boolean} [showSymbol=true]
 */
export function formatCurrency(amount, showSymbol = true) {
  if (amount === null || amount === undefined) return '—'
  const formatted = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
  return showSymbol ? `KES ${formatted}` : formatted
}

/**
 * Format ISO date string to readable format.
 * @param {string} isoString
 * @param {Object} [options]
 */
export function formatDate(isoString, options = {}) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  const defaults = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  }
  return new Intl.DateTimeFormat('en-KE', defaults).format(date)
}

/**
 * Format ISO date string with time.
 */
export function formatDateTime(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Format relative time ("2 hours ago", "3 days ago").
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '—'
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now - date
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60)  return 'Just now'
  if (diffMins < 60)  return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7)   return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  return formatDate(isoString)
}

/**
 * Mask phone number for privacy display.
 * 0712345678 → 0712 *** 678
 */
export function maskPhone(phone) {
  if (!phone) return '—'
  const clean = phone.replace(/\D/g, '')
  if (clean.length < 9) return phone
  return `${clean.slice(0, 4)} *** ${clean.slice(-3)}`
}

/**
 * Format phone for display (add spaces).
 * 254712345678 → +254 712 345 678
 */
export function formatPhone(phone) {
  if (!phone) return '—'
  const clean = phone.replace(/\D/g, '')
  if (clean.startsWith('254') && clean.length === 12) {
    return `+${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9)}`
  }
  return phone
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text, maxLength = 50) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}

/**
 * Capitalize first letter of each word.
 */
export function titleCase(str) {
  if (!str) return ''
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
