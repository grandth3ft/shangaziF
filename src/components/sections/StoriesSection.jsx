import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'
import StoryCard from '@/components/shared/StoryCard'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const STORIES = [
  {
    quote: "Before Shangazi, I had not been to school in two years. Today I am in Form 3 and I want to be an engineer. They believed in me when no one else did.",
    name: "Brian Omondi",
    role: "Sponsored student, now Form 3",
    avatarInitials: "BO",
    avatarColor: "bg-forest",
  },
  {
    quote: "My children were malnourished and I had no money for school fees. Shangazi stepped in. Now my daughter leads her class. I have hope again.",
    name: "Mary Wanjiku",
    role: "Mother of two beneficiaries",
    avatarInitials: "MW",
    avatarColor: "bg-terracotta",
  },
  {
    quote: "I volunteered as a mentor for one year. What I received back — in joy, in perspective, in purpose — was worth far more than anything I gave.",
    name: "Dr. James Kamau",
    role: "Mentor, Medical Professional",
    avatarInitials: "JK",
    avatarColor: "bg-sage",
  },
]

export default function StoriesSection() {
  return (
    <section className="section bg-ivory" aria-label="Success stories">
      <div className="container-content">
        <SectionHeader
          eyebrow="Real Stories"
          title="Voices of Impact"
          subtitle="These are not statistics. These are real children and families whose lives changed because generous people chose to give."
          className="mb-16"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {STORIES.map((story) => (
            <motion.div key={story.name} variants={fadeInUp}>
              <StoryCard story={story} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 text-body-md font-semibold text-terracotta hover:underline group"
          >
            Read more impact stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
