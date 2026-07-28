import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Heart } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/utils/animations'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center">
      <div className="container-narrow py-24 text-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp} className="w-24 h-24 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-terracotta" aria-hidden="true" />
          </motion.div>
          <motion.h1 variants={fadeInUp} className="font-mono font-bold text-display-xl text-ash mb-4">404</motion.h1>
          <motion.h2 variants={fadeInUp} className="font-display text-heading-lg text-forest mb-4">Page Not Found</motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-stone mb-10 max-w-md mx-auto">The page you're looking for doesn't exist. But the children we support are very real — and your help matters.</motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary px-8 py-3 inline-flex items-center gap-2"><Home className="w-4 h-4" /> Go Home</Link>
            <Link to="/donate" className="btn-secondary px-8 py-3 inline-flex items-center gap-2"><Heart className="w-4 h-4" /> Donate Instead</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
