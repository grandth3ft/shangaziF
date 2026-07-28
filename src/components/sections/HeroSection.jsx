import { useReducedMotion, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ArrowDown, ChevronRight } from 'lucide-react'
import { heroContainer, heroHeadline, heroSubtext, heroCTA } from '@/utils/animations'

const HERO_STATS = [
  { value: '500+',    label: 'Children Helped' },
  { value: 'KES 2M+', label: 'Raised This Year' },
  { value: '12 Yrs',  label: 'Of Service' },
]

// ── Hero photo — replace this URL with your actual photo ──────────────────────
// Use a high-quality image of children at the home (1920×1080 or larger).
// Recommended: upload to Cloudinary and paste the secure_url here, or
// place the image in /public/images/ and reference it as '/images/hero.jpg'.
const HERO_PHOTO_URL = null
// Example: const HERO_PHOTO_URL = 'https://res.cloudinary.com/yourcloud/image/upload/v1/shangazi/hero.jpg'

export default function HeroSection() {
  const reduced = useReducedMotion()

  const scrollToMission = () =>
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })

  const safeHeroHeadline = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : heroHeadline

  const safeHeroSubtext = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : heroSubtext

  const safeHeroCTA = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : heroCTA

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Shangazi Foundation"
      style={{ background: '#1A3A2A' }}
    >
      {/* ── Hero photo layer ── */}
      {HERO_PHOTO_URL ? (
        <>
          {/* Actual photo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_PHOTO_URL})` }}
            aria-hidden="true"
          />
          {/* Dark overlay so text stays readable over any photo */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(26,58,42,0.82) 0%, rgba(26,58,42,0.60) 50%, rgba(26,58,42,0.75) 100%)',
            }}
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          {/* Fallback gradient background when no photo is set */}
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

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ── Floating ambient orbs (no photo mode only) ── */}
      {!HERO_PHOTO_URL && !reduced && (
        <>
          <motion.div
            className="absolute top-[20%] right-[8%] w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(232,148,58,0.15), transparent 70%)' }}
            animate={{ y: [0, -24, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-[25%] left-[4%] w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%)' }}
            animate={{ y: [0, 20, 0], scale: [1, 0.94, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Organic ivory arc at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-ivory pointer-events-none"
        style={{ clipPath: 'ellipse(58% 100% at 50% 100%)' }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="container-content relative z-10 pt-28 pb-36">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={heroContainer} initial="hidden" animate="visible">
            {/* Eyebrow pill */}
            <motion.div variants={safeHeroSubtext} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-tiny font-semibold tracking-widest uppercase backdrop-blur-md shadow-lg">
                <motion.span
                  className="w-2 h-2 rounded-full bg-amber flex-shrink-0"
                  animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
                Shangazi Foundation · Nairobi, Kenya
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={safeHeroHeadline}
              className="font-display text-display-lg md:text-display-xl text-white leading-[1.05] mb-7 tracking-tight"
            >
              Every Child Deserves{' '}
              <br className="hidden sm:block" />
              a{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-terracotta">
                  Chance to Thrive
                </span>
                <motion.span
                  className="absolute -bottom-1.5 left-0 right-0 h-[3px] rounded-full"
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
              variants={safeHeroSubtext}
              className="text-body-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              We provide education, healthcare, meals, and shelter to vulnerable children
              in Kenya. Your donation today can change a child's future forever.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={safeHeroCTA}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link
                to="/donate"
                className="group relative inline-flex items-center gap-3 px-9 py-4 bg-gradient-cta text-white font-semibold text-body-md rounded-soft shadow-cta-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.97]"
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
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold text-body-md rounded-soft backdrop-blur-sm hover:bg-white/20 transition-all duration-200 active:scale-[0.97]"
              >
                Our Story
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Social proof stats row */}
            <motion.div
              variants={safeHeroSubtext}
              className="inline-flex items-center gap-0 divide-x divide-white/20 bg-white/10 border border-white/20 rounded-soft px-2 py-1 backdrop-blur-sm"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="px-6 py-3 text-center">
                  <p className="font-mono font-bold text-heading-md text-white leading-none">{stat.value}</p>
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
        className="absolute bottom-36 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down to content"
      >
        <span className="text-tiny tracking-widest uppercase font-semibold">Scroll</span>
        <ArrowDown className="w-4 h-4" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
