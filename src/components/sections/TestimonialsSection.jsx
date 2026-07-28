import { useState, useEffect } from 'react'
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

const TESTIMONIALS = [
  { quote: "I've supported many organizations over the years, but Shangazi is different. They respond to every message, share photos of the children, and you genuinely feel the impact.", name: "Patricia Ngugi",  role: "Monthly Donor since 2020", stars: 5 },
  { quote: "As a diaspora Kenyan, I wanted to give back in a meaningful way. Shangazi made it easy, transparent, and deeply moving. I encourage every Kenyan abroad to donate.",         name: "David Mwangi",   role: "Donor, UK",               stars: 5 },
  { quote: "Our company adopted a child through Shangazi and it transformed our culture. Staff volunteer, donate personally, and feel truly connected to the cause.",                    name: "Amina Hassan",   role: "Corporate Partner, Nairobi", stars: 5 },
  { quote: "The M-Pesa donation process is so simple. I donate every month in under 30 seconds. No excuses not to give.",                                                               name: "Samuel Otieno",  role: "Recurring Donor",            stars: 5 },
]

const AUTOPLAY_INTERVAL = 6000

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1) // 1 = forward, -1 = backward
  const reduced               = useReducedMotion()

  const total = TESTIMONIALS.length

  const go = (idx) => {
    setDir(idx > current ? 1 : -1)
    setCurrent((idx + total) % total)
  }
  const prev = () => go(current - 1)
  const next = () => go(current + 1)

  /* Autoplay */
  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => { setDir(1); setCurrent((c) => (c + 1) % total) }, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [reduced, total])

  const variants = {
    enter:   (d) => ({ opacity: 0, x: reduced ? 0 : d * 40 }),
    center:  { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit:    (d) => ({ opacity: 0, x: reduced ? 0 : d * -40, transition: { duration: 0.25, ease: 'easeIn' } }),
  }

  const t = TESTIMONIALS[current]

  return (
    <section className="section bg-ivory-dark" aria-label="Donor testimonials">
      <div className="container-content">
        <SectionHeader
          eyebrow="What People Say"
          title="Trusted by Donors Across Kenya and Beyond"
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-soft shadow-lg-warm p-8 md:p-12 overflow-hidden">

            {/* Decorative quote mark */}
            <div className="absolute top-6 right-8 font-display text-[8rem] leading-none text-ash/30 select-none pointer-events-none" aria-hidden="true">
              "
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6" aria-label={`${t.stars} out of 5 stars`}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber fill-amber" aria-hidden="true" />
              ))}
            </div>

            {/* Animated quote */}
            <div className="relative min-h-[160px] md:min-h-[120px]">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={current}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <blockquote className="font-display text-heading-md text-forest leading-relaxed mb-8">
                    "{t.quote}"
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-cta flex items-center justify-center flex-shrink-0 shadow-cta/40 shadow-md">
                      <span className="text-white font-bold text-body-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-body-md text-forest">{t.name}</p>
                      <p className="text-body-sm text-stone">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-ash/50">
              {/* Dot indicators */}
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => go(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? '#C1440E' : '#C8C2B8',
                    }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-ash flex items-center justify-center text-stone hover:text-forest hover:border-forest/30 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center shadow-cta/40 shadow-md hover:bg-terracotta-600 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
