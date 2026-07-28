import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
import { ORG, PUBLIC_NAV_LINKS } from '@/utils/constants'

const PROGRAM_LINKS = [
  { label: 'Education',         path: '/programs' },
  { label: 'Healthcare',        path: '/programs' },
  { label: 'Feeding Program',   path: '/programs' },
  { label: 'Shelter & Housing', path: '/programs' },
  { label: 'Mentorship',        path: '/programs' },
]

export default function Footer() {
  return (
    <footer className="bg-forest text-white" role="contentinfo">

      {/* ── Main footer content ── */}
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group" aria-label="Shangazi Foundation - Home">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-cta shadow-cta/50 shadow-md group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-4 h-4 text-white fill-white" aria-hidden="true" />
              </div>
              <span className="font-display font-semibold text-body-md">
                Shangazi <span className="text-amber">Foundation</span>
              </span>
            </Link>
            <p className="text-body-sm text-white/60 leading-relaxed mb-6">
              {ORG.tagline}. Supporting vulnerable children in Kenya through education, healthcare, and love.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3" aria-label="Social media links">
              {[
                { icon: Twitter,   href: ORG.social.twitter,   label: 'Twitter' },
                { icon: Facebook,  href: ORG.social.facebook,  label: 'Facebook' },
                { icon: Instagram, href: ORG.social.instagram, label: 'Instagram' },
                { icon: Linkedin,  href: ORG.social.linkedin,  label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-terracotta hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h3 className="font-semibold text-body-sm text-white mb-4 tracking-wide">
              Navigate
            </h3>
            <ul className="space-y-2.5" role="list">
              {PUBLIC_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-white/60 hover:text-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Programs column ── */}
          <div>
            <h3 className="font-semibold text-body-sm text-white mb-4 tracking-wide">
              Our Programs
            </h3>
            <ul className="space-y-2.5" role="list">
              {PROGRAM_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-body-sm text-white/60 hover:text-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h3 className="font-semibold text-body-sm text-white mb-4 tracking-wide">
              Get in Touch
            </h3>
            <address className="not-italic space-y-3">
              <a
                href={`mailto:${ORG.email}`}
                className="flex items-start gap-3 text-body-sm text-white/60 hover:text-amber transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-amber" aria-hidden="true" />
                {ORG.email}
              </a>
              <a
                href={`tel:${ORG.phone.replace(/\s/g, '')}`}
                className="flex items-start gap-3 text-body-sm text-white/60 hover:text-amber transition-colors duration-200 group"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-amber" aria-hidden="true" />
                {ORG.phone}
              </a>
              <div className="flex items-start gap-3 text-body-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                {ORG.address}
              </div>
            </address>

            <div className="mt-6">
              <Link to="/donate" className="btn-outline-white text-body-sm py-2.5 px-5">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-content py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-tiny text-white/40">
            © {new Date().getFullYear()} Shangazi Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-tiny text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-tiny text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
            <p className="text-tiny text-white/30 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-terracotta fill-terracotta" aria-label="love" /> in Kenya
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
