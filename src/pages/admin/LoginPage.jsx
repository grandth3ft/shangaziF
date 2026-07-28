import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Heart, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { loginValidation } from '@/utils/validators'
import { staggerContainer, fadeInUp, scaleIn } from '@/utils/animations'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin/dashboard'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Login failed. Check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={scaleIn} className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-cta flex items-center justify-center mx-auto mb-4 shadow-cta">
              <Heart className="w-8 h-8 text-white fill-white/70" aria-hidden="true" />
            </div>
            <h1 className="font-display text-heading-lg text-forest">Admin Portal</h1>
            <p className="text-body-sm text-stone mt-1">Shangazi Foundation</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white rounded-soft shadow-lg-warm p-8">
            <h2 className="font-display text-heading-md text-forest mb-6">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <Input label="Email Address" type="email" placeholder="admin@shangazifoundation.org" autoComplete="email" required error={errors.email?.message} leftIcon={<Mail className="w-4 h-4" />} {...register('email', loginValidation.email)} />
              <div className="flex flex-col gap-0">
                <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="Your password" autoComplete="current-password" required error={errors.password?.message} leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-stone hover:text-forest transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  {...register('password', loginValidation.password)}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} loadingText="Signing in…">Sign In</Button>
            </form>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-center text-body-sm text-stone mt-6">
            <a href="/" className="text-terracotta hover:underline">← Back to website</a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
