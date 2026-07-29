import { useReducedMotion, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowDown, ChevronRight } from 'lucide-react'
import { heroContainer, heroHeadline, heroSubtext, heroCTA } from '@/utils/animations'

const HERO_STATS = [
  { value: '500+',    label: 'Children Helped' },
  { value: 'KES 2M+', label: 'Raised This Year' },
  { value: '12 Yrs',  label: 'Of Service' },
]

// ─────────────────────────────────────────────────────────────────────────────
// DROP YOUR PHOTO HERE
// Upload the Shangazi team/children photo to Cloudinary (or /public/images/)
// and paste the URL below. The Shangazi green stays fully vibrant on the left
// half while the photo bleeds in on the right — both desktop and mobile.
//
// Example:
//   const HERO_PHOTO_URL = 'https://res.cloudinary.com/yourcloud/image/upload/v1/shangazi/team.jpg'
// ─────────────────────────────────────────────────────────────────────────────
const HERO_PHOTO_URL = null

export default function HeroSection() {
  const reduced = useReducedMotion()

  const scrollToMission = () =>
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })

  const safeVariant = (v) =>
    reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } } : v

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Shangazi Foundation"
      style={{ background: '#1A3A2A' }}
    >
      {/* ── Layer 1: Photo (right side on desktop, full behind on mobile) ── */}
      {HERO_PHOTO_URL && (
        <>
          {/* The actual photo — covers full section */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_PHOTO_URL})` }}
            aria-hidden="true"
          />

          {/* 
            Mobile overlay: uniform dark-green tint so text is always readable
            on small screens where the photo covers the full background.
          */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{ background: 'rgba(26,58,42,0.78)' }}
            aria-hidden="true"
          />

          {/*
            Desktop overlay: strong opaque green on the LEFT (where text lives),
            fading to near-transparent on the RIGHT (where the photo shows through).
            This preserves the vibrant Shangazi green while the photo bleeds in
            from the right edge.
          */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                'linear-gradient(100deg, rgba(26,58,42,0.97) 0%, rgba(26,58,42,0.90) 40%, rgba(26,58,42,0.55) 65%, rgba(26,58,42,0.15) 100%)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Layer 1 (no photo): full gradient background ── */}
      {!HERO_PHOTO_URL && (
        <>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1A3A2A 0%, #2D5A3D 50%, #1A3A2A 100%)' }}
            aria-hidden="true"
          />
          {/* Atmospheric colour orbs */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 60% at 15% 80%, rgba(232,148,58,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 85% 20%, rgba(74,124,89,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 50% 110%, rgba(193,68,14,0.12) 0%, transparent 60%)
              `,
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Layer 2: Subtle grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Floating ambient orbs (gradient-only mode) ── */}
      {!HERO_PHOTO_URL && !reduced && (
        <>
          <motion.div
            className="absolute top-[20%] right-[8%] w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(232,148,58,0.15), transparent 70%)' }}
            animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-[25%] left-[4%] w-36 sm:w-56 h-36 sm:h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)' }}
            animate={{ y: [0, 20, 0], scale: [1, 0.94, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Layer 4: Ivory arc at the bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-ivory pointer-events-none"
        style={{ clipPath: 'ellipse(58% 100% at 50% 100%)' }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container-content relative z-10 w-full pt-24 pb-28 sm:pt-28 sm:pb-36">
        {/*
          Mobile: centered single column
          Desktop: left-aligned column capped at half-width so text never
                   overlaps the photo on the right side.
        */}
        <div className="text-center sm:text-left sm:max-w-[55%]">
          <motion.div variants={heroContainer} initial="hidden" animate="visible">

            {/* Eyebrow pill */}
            <motion.div variants={safeVariant(heroSubtext)} className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-tiny font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
                <motion.span
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber flex-shrink-0"
                  animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
                <span className="hidden xs:inline">Shangazi Foundation · </span>Nairobi, Kenya
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={safeVariant(heroHeadline)}
              className="font-display text-[2.4rem] leading-[1.08] xs:text-display-lg sm:text-display-lg md:text-display-xl text-white mb-5 sm:mb-7 tracking-tight"
            >
              Every Child Deserves
              <br />
              a{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-terracotta">
                  Chance to Thrive
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, #E8943A, #C1440E)' }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={safeVariant(heroSubtext)}
              className="text-base sm:text-body-lg text-white/75 mb-8 sm:mb-12 leading-relaxed max-w-lg mx-auto sm:mx-0"
            >
              We provide education, healthcare, meals, and shelter to vulnerable children
              in Kenya. Your donation today can change a child's future forever.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={safeVariant(heroCTA)}
              className="flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-10 sm:mb-16"
            >
              <Link
                to="/donate"
                className="group relative w-full xs:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-9 sm:py-4 bg-gradient-cta text-white font-semibold text-body-md rounded-soft shadow-cta-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.97]"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)' }}
                  aria-hidden="true"
                />
                <Heart className="w-5 h-5 fill-white/70 group-hover:fill-white group-hover:scale-110 transition-all duration-200 relative z-10" aria-hidden="true" />
                <span className="relative z-10">Donate Now</span>
              </Link>

              <Link
                to="/about"
                className="group w-full xs:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 bg-white/10 border border-white/25 text-white font-semibold text-body-md rounded-soft backdrop-blur-sm hover:bg-white/20 transition-all duration-200 active:scale-[0.97]"
              >
                Our Story
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={safeVariant(heroSubtext)}
              className="inline-flex flex-wrap justify-center sm:justify-start items-center divide-x divide-white/20 bg-white/10 border border-white/20 rounded-soft backdrop-blur-sm overflow-hidden"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-3 sm:px-6 text-center">
                  <p className="font-mono font-bold text-base sm:text-heading-md text-white leading-none">{stat.value}</p>
                  <p className="text-tiny text-white/50 mt-1 whitespace-nowrap">{stat.label}</p>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        onClick={scrollToMission}
        className="absolute bottom-20 sm:bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-1.5 text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down to content"
      >
        <span className="text-tiny tracking-widest uppercase font-semibold hidden sm:block">Scroll</span>
        <ArrowDown className="w-4 h-4" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
