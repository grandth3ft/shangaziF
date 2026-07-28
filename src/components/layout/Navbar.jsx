import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart } from 'lucide-react'
import { PUBLIC_NAV_LINKS, ORG } from '@/utils/constants'

export default function Navbar() {
  const [isScrolled,   setIsScrolled]   = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const reduced       = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsMobileOpen(false) }, [pathname])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const isHeroPage    = pathname === '/'
  const isTransparent = isHeroPage && !isScrolled && !isMobileOpen

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm-warm border-b border-ash/40',
      ].join(' ')}
      role="banner"
    >
      <nav className="container-content" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label={`${ORG.name} — Home`}>
            <motion.div
              whileHover={reduced ? {} : { scale: 1.12, rotate: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-cta shadow-cta/50 shadow-md"
            >
              <Heart className="w-4 h-4 text-white fill-white" aria-hidden="true" />
            </motion.div>
            <span className={[
              'font-display font-semibold text-body-md tracking-tight transition-colors duration-300',
              isTransparent ? 'text-white' : 'text-forest',
            ].join(' ')}>
              Shangazi <span className="text-terracotta">Foundation</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {PUBLIC_NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) => [
                    'relative px-3.5 py-2 rounded-card text-body-sm font-medium transition-colors duration-200',
                    isTransparent
                      ? isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      : isActive ? 'text-terracotta' : 'text-forest/60 hover:text-forest',
                  ].join(' ')}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className={[
                            'absolute inset-0 rounded-card -z-10',
                            isTransparent ? 'bg-white/10' : 'bg-terracotta/10',
                          ].join(' ')}
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={reduced ? {} : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/donate"
                className={[
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-card font-semibold text-body-sm transition-all duration-200',
                  isTransparent
                    ? 'bg-white text-forest shadow-md hover:bg-ivory'
                    : 'bg-terracotta text-white shadow-cta hover:bg-terracotta-600',
                ].join(' ')}
              >
                <Heart className={['w-4 h-4', isTransparent ? 'fill-terracotta/40' : 'fill-white/60'].join(' ')} aria-hidden="true" />
                Donate
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className={[
              'md:hidden p-2 rounded-card transition-colors duration-200',
              isTransparent ? 'text-white hover:bg-white/10' : 'text-forest hover:bg-ivory-dark',
            ].join(' ')}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen
                ? <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X    className="w-5 h-5" aria-hidden="true" /></motion.div>
                : <motion.div key="men" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" aria-hidden="true" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white border-t border-ash/40 overflow-hidden shadow-lg-warm"
          >
            <nav className="container-content py-5">
              <ul className="flex flex-col gap-1" role="list">
                {PUBLIC_NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                  >
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => [
                        'block px-4 py-3 rounded-card text-body-md font-medium transition-colors duration-200',
                        isActive ? 'text-terracotta bg-terracotta/10' : 'text-forest/70 hover:text-forest hover:bg-ivory-dark',
                      ].join(' ')}
                    >
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: PUBLIC_NAV_LINKS.length * 0.05, duration: 0.25 }}
                  className="pt-3 mt-2 border-t border-ash/50"
                >
                  <Link to="/donate" className="btn-primary w-full justify-center py-3">
                    <Heart className="w-4 h-4 fill-white/70" aria-hidden="true" />
                    Donate Now
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
