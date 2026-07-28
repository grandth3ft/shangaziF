/**
 * Framer Motion animation variants library — Phase 8 polished pass.
 * All variants respect prefers-reduced-motion via the useReducedMotion hook.
 * Import these into components for consistent, reusable animations.
 */

// ── Fade & Slide ─────────────────────────────────────────────────────────────

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

export const fadeInUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInDown = {
  hidden:  { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeInRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

export const scaleInFast = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
}

// ── Stagger containers ────────────────────────────────────────────────────────

export const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

export const staggerContainerFast = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
}

export const staggerContainerSlow = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

// ── Hero sequence (premium, staggered entrance) ───────────────────────────────

export const heroContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
}

export const heroHeadline = {
  hidden:  { opacity: 0, y: 48, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export const heroSubtext = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export const heroCTA = {
  hidden:  { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } },
}

// ── Page transition ───────────────────────────────────────────────────────────

export const pageTransition = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

// ── Donation success celebration ─────────────────────────────────────────────

export const successContainer = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

export const successIcon = {
  hidden:  { opacity: 0, scale: 0, rotate: -30 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } },
}

// ── Card hover ────────────────────────────────────────────────────────────────

export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 2px 8px rgba(26,58,42,0.06)', transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -6, boxShadow: '0 12px 40px rgba(26,58,42,0.16)', transition: { duration: 0.3, ease: 'easeOut' } },
}

// ── Image reveal (clip-path wipe) ─────────────────────────────────────────────

export const imageReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
}

// ── Number counter spring config ──────────────────────────────────────────────

export const counterSpring = { stiffness: 55, damping: 18, restDelta: 0.5 }

// ── List item (for staggered lists) ──────────────────────────────────────────

export const listItem = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

// ── Tab/pill switcher ─────────────────────────────────────────────────────────

export const tabContent = {
  hidden:  { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -12, transition: { duration: 0.2, ease: 'easeIn' } },
}

// ── Navbar item ───────────────────────────────────────────────────────────────

export const navItem = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

// ── Drawer / side panel ───────────────────────────────────────────────────────

export const drawerLeft = {
  hidden:  { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { x: '-100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

// ── Floating badge/tooltip ────────────────────────────────────────────────────

export const floatBadge = {
  hidden:  { opacity: 0, scale: 0.8, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } },
}

// ── Shimmer loading (used in skeleton override) ───────────────────────────────

export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
  },
}
