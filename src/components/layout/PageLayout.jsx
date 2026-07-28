import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { pageTransition } from '@/utils/animations'

export default function PageLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          id="main-content"
          className="flex-1"
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
