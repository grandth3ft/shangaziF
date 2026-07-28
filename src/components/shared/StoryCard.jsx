import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { cardHover } from '@/utils/animations'

/**
 * StoryCard — testimonial or success story with quote, name, role, avatar.
 */
export default function StoryCard({ story }) {
  const { quote, name, role, avatarInitials, avatarColor, image } = story

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className="bg-white rounded-soft shadow-sm-warm p-6 flex flex-col"
    >
      {/* Quote icon */}
      <div className="mb-4">
        <div className="w-10 h-10 rounded-card bg-terracotta/10 flex items-center justify-center">
          <Quote className="w-5 h-5 text-terracotta" aria-hidden="true" />
        </div>
      </div>

      {/* Quote text */}
      <blockquote className="flex-1 mb-6">
        <p className="text-body-md text-forest leading-relaxed italic">
          "{quote}"
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-ash/50">
        {/* Avatar */}
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            ${avatarColor || 'bg-gradient-cta'}
          `}
          aria-hidden="true"
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold text-body-sm">
              {avatarInitials || name?.[0]?.toUpperCase() || '?'}
            </span>
          )}
        </div>

        <div>
          <p className="font-semibold text-body-sm text-forest">{name}</p>
          {role && (
            <p className="text-tiny text-stone">{role}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
