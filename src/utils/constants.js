// ── Donation amounts ────────────────────────────────────────────────────────
export const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000]

export const AMOUNT_IMPACT_MAP = {
  500:   'Feeds a child for a week',
  1000:  'Provides school supplies for a month',
  2500:  'Covers healthcare for one child',
  5000:  "Sponsors a child's education for a term",
  10000: 'Supports a family for a month',
}

export const MIN_DONATION = 10
export const MAX_DONATION = 999999

// ── Donation status ─────────────────────────────────────────────────────────
export const DONATION_STATUS = {
  PENDING:   'pending',
  COMPLETED: 'completed',
  FAILED:    'failed',
  CANCELLED: 'cancelled',
}

export const STATUS_LABELS = {
  pending:   'Pending',
  completed: 'Completed',
  failed:    'Failed',
  cancelled: 'Cancelled',
}

// ── Navigation ──────────────────────────────────────────────────────────────
export const PUBLIC_NAV_LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Programs', path: '/programs' },
  { label: 'Impact',   path: '/impact' },
  { label: 'Gallery',  path: '/gallery' },
  { label: 'Contact',  path: '/contact' },
]

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard',      path: '/admin/dashboard',      icon: 'LayoutDashboard' },
  { label: 'Donations',      path: '/admin/donations',      icon: 'Heart' },
  { label: 'Gallery',        path: '/admin/gallery',        icon: 'Image' },
  { label: 'Impact Stories', path: '/admin/impact-stories', icon: 'BookOpen' },
  { label: 'Programs',       path: '/admin/programs',       icon: 'LayoutGrid' },
  { label: 'Audit Logs',     path: '/admin/audit-logs',     icon: 'ScrollText', superAdminOnly: true },
]

// ── Organization info ───────────────────────────────────────────────────────
export const ORG = {
  name:    'Shangazi Foundation',
  tagline: 'Giving Children a Chance to Thrive',
  email:   'info@shangazifoundation.org',
  phone:   '+254 700 000 000',
  address: 'Nairobi, Kenya',
  social: {
    twitter:   'https://twitter.com/shangazi',
    facebook:  'https://facebook.com/shangazi',
    instagram: 'https://instagram.com/shangazi',
    linkedin:  'https://linkedin.com/company/shangazi',
  },
}

// ── Impact statistics ────────────────────────────────────────────────────────
export const IMPACT_STATS = [
  { value: 500,  suffix: '+', label: 'Children Supported',    description: 'Directly benefiting from our programs' },
  { value: 12,   suffix: '',  label: 'Years of Service',       description: 'Building community since 2012' },
  { value: 2500, suffix: '+', label: 'Meals Served Monthly',   description: 'Nutritious meals every month' },
  { value: 95,   suffix: '%', label: 'School Completion Rate', description: 'Among our sponsored children' },
]

// ── Error messages ───────────────────────────────────────────────────────────
export const ERROR_MESSAGES = {
  NETWORK:        'Unable to reach the server. Please check your connection.',
  TIMEOUT:        'The request took too long. Please try again.',
  UNAUTHORIZED:   'Your session has expired. Please sign in again.',
  FORBIDDEN:      'You do not have permission to access this resource.',
  SERVER:         'Something went wrong on our end. Please try again shortly.',
  UNKNOWN:        'An unexpected error occurred. Please try again.',
}
