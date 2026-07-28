import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const CATEGORIES = ['All', 'Education', 'Healthcare', 'Feeding', 'Events']
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  category: CATEGORIES[1 + (i % 4)],
  title: `Gallery Image ${i + 1}`,
  aspect: i % 3 === 0 ? 'aspect-square' : i % 3 === 1 ? 'aspect-video' : 'aspect-card-img',
  color: ['bg-forest/80','bg-terracotta/80','bg-sage/80','bg-amber/80'][i % 4],
}))

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active)

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Our Moments</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">Gallery</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-xl mx-auto">Glimpses into the lives we touch every day.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} className={`px-4 py-2 rounded-full text-body-sm font-semibold transition-all duration-200 ${active === cat ? 'bg-terracotta text-white shadow-cta' : 'bg-white text-stone border border-ash hover:border-terracotta hover:text-terracotta'}`}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className={`${item.aspect} ${item.color} rounded-card cursor-pointer overflow-hidden relative group`} onClick={() => setLightbox(item)} role="button" aria-label={`View ${item.title}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-white/40" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <p className="text-white text-tiny font-medium">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-modal flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" aria-label="Close lightbox"><X className="w-6 h-6" /></button>
            <div className={`${lightbox.color} ${lightbox.aspect} w-full max-w-2xl rounded-soft flex items-center justify-center`} onClick={(e) => e.stopPropagation()}>
              <ImageIcon className="w-24 h-24 text-white/30" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
