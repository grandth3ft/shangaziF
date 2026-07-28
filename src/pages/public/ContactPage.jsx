import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Twitter, Facebook, Instagram } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ORG } from '@/utils/constants'
import { toast } from 'react-toastify'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/utils/animations'

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! We'll get back to you within 24 hours.")
    reset()
  }

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-ivory" style={{ clipPath: 'ellipse(60% 100% at 50% 100%)' }} aria-hidden="true" />
        <div className="container-content relative text-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p variants={fadeInUp} className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3">Get In Touch</motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-display-md text-white mb-4">Contact Us</motion.h1>
            <motion.p variants={fadeInUp} className="text-body-lg text-white/70 max-w-xl mx-auto">We'd love to hear from you — whether you're a donor, volunteer, partner, or just curious about our work.</motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <motion.div variants={fadeInLeft} initial="hidden" animate="visible">
            <h2 className="font-display text-heading-lg text-forest mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Your name" required error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
                <Input label="Email Address" type="email" placeholder="you@example.com" required error={errors.email?.message} {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
              </div>
              <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message} {...register('subject', { required: 'Subject is required' })} />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="label-base">Message <span className="text-terracotta" aria-hidden="true">*</span></label>
                <textarea id="message" rows={5} placeholder="Tell us more..." className="input-base resize-none" {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Message too short' } })} />
                {errors.message && <p className="error-text">{errors.message.message}</p>}
              </div>
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} loadingText="Sending..." leftIcon={<Send className="w-4 h-4" />}>Send Message</Button>
            </form>
          </motion.div>

          <motion.div variants={fadeInRight} initial="hidden" animate="visible" className="space-y-6">
            <div>
              <h2 className="font-display text-heading-lg text-forest mb-6">Contact Information</h2>
              <div className="space-y-4">
                {[{ icon: Mail, label: 'Email', value: ORG.email, href: `mailto:${ORG.email}` }, { icon: Phone, label: 'Phone', value: ORG.phone, href: `tel:${ORG.phone}` }, { icon: MapPin, label: 'Address', value: ORG.address, href: null }].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-card shadow-sm-warm">
                      <div className="w-10 h-10 rounded-card bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-terracotta" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-tiny font-semibold text-stone uppercase tracking-wider mb-1">{item.label}</p>
                        {item.href ? <a href={item.href} className="text-body-md text-forest font-medium hover:text-terracotta transition-colors">{item.value}</a> : <p className="text-body-md text-forest font-medium">{item.value}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-forest rounded-soft p-6">
              <h3 className="font-semibold text-body-md text-white mb-4">Follow Our Work</h3>
              <div className="flex items-center gap-3">
                {[{ icon: Twitter, href: ORG.social.twitter, label: 'Twitter' }, { icon: Facebook, href: ORG.social.facebook, label: 'Facebook' }, { icon: Instagram, href: ORG.social.instagram, label: 'Instagram' }].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-terracotta hover:text-white transition-all duration-200">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <p className="text-body-sm text-white/60 mt-4">We respond to messages within 24 business hours.</p>
            </div>

            <div className="bg-ivory-dark rounded-soft p-6 border border-ash">
              <h3 className="font-semibold text-body-md text-forest mb-2">Office Hours</h3>
              <div className="space-y-1 text-body-sm text-stone">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-forest">8:00 AM – 5:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="font-medium text-forest">9:00 AM – 1:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-stone">Closed</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
