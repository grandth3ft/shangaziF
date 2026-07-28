import { MIN_DONATION, MAX_DONATION } from './constants'

/**
 * Validate Kenyan phone number.
 * Accepts: 07XXXXXXXX, 01XXXXXXXX, +2547XXXXXXXX, 2547XXXXXXXX
 */
export function isValidKenyanPhone(phone) {
  if (!phone) return false
  const clean = phone.replace(/\s/g, '')
  return /^(?:(?:\+?254)|0)[17]\d{8}$/.test(clean)
}

/**
 * Normalize phone to format backend expects.
 * Backend normalizes internally, but we can pre-format for display.
 */
export function normalizePhone(phone) {
  const clean = phone.replace(/\D/g, '')
  if (clean.startsWith('0') && clean.length === 10) {
    return `254${clean.slice(1)}`
  }
  if (clean.startsWith('254') && clean.length === 12) {
    return clean
  }
  return phone
}

/**
 * React Hook Form validation rules for donation form fields.
 * These mirror the backend validators exactly.
 */
export const donationValidation = {
  donor_name: {
    required: 'Your name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' },
    maxLength: { value: 150, message: 'Name is too long' },
    pattern: {
      value: /^[a-zA-Z\s'\-]+$/,
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    },
  },

  phone_number: {
    required: 'Phone number is required',
    validate: (value) =>
      isValidKenyanPhone(value) ||
      'Enter a valid Kenyan number (e.g. 0712 345 678)',
  },

  amount: {
    required: 'Please enter an amount',
    min: {
      value: MIN_DONATION,
      message: `Minimum donation is KES ${MIN_DONATION}`,
    },
    max: {
      value: MAX_DONATION,
      message: `Maximum donation is KES ${MAX_DONATION.toLocaleString()}`,
    },
    validate: (value) =>
      Number.isFinite(Number(value)) || 'Please enter a valid amount',
  },
}

/**
 * Admin login validation rules.
 */
export const loginValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address',
    },
  },

  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password is too short' },
  },
}
