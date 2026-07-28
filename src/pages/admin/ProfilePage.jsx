import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { User, Mail, Lock, Camera, CheckCircle2, Eye, EyeOff, Upload } from 'lucide-react'
import { toast } from 'react-toastify'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { updateProfile, changePassword, updateAvatar } from '@/api/auth'
import { staggerContainer, fadeInUp } from '@/utils/animations'
import { formatDateTime } from '@/utils/formatters'

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="font-display text-heading-lg text-forest">My Profile</h1>
          <p className="text-body-sm text-stone mt-1">Manage your account details and security settings</p>
        </motion.div>

        {/* Profile summary card */}
        <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6">
          <AvatarSection user={user} updateUser={updateUser} />
        </motion.div>

        {/* Profile details */}
        <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6">
          <ProfileDetailsSection user={user} updateUser={updateUser} />
        </motion.div>

        {/* Change password */}
        <motion.div variants={fadeInUp} className="bg-white rounded-card shadow-sm-warm p-6">
          <ChangePasswordSection />
        </motion.div>

        {/* Account info */}
        <motion.div variants={fadeInUp} className="bg-ivory-dark rounded-card p-5 border border-ash/50">
          <h3 className="text-body-sm font-semibold text-forest mb-3">Account Information</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-tiny text-stone">
            <div>
              <span className="font-semibold text-stone uppercase tracking-wider">Role</span>
              <p className="mt-1 capitalize font-medium text-forest">{user?.role?.replace('_', ' ')}</p>
            </div>
            <div>
              <span className="font-semibold text-stone uppercase tracking-wider">Last Login</span>
              <p className="mt-1 font-medium text-forest">{user?.last_login ? formatDateTime(user.last_login) : '—'}</p>
            </div>
            <div>
              <span className="font-semibold text-stone uppercase tracking-wider">Account Created</span>
              <p className="mt-1 font-medium text-forest">{user?.created_at ? formatDateTime(user.created_at) : '—'}</p>
            </div>
            <div>
              <span className="font-semibold text-stone uppercase tracking-wider">Account ID</span>
              <p className="mt-1 font-mono text-tiny text-stone">{user?.id}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ── Avatar Section ────────────────────────────────────────────────────────────
function AvatarSection({ user, updateUser }) {
  const fileRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Show local preview immediately
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(file)

    setIsUploading(true)
    try {
      const updatedUser = await updateAvatar(file)
      updateUser(updatedUser)
      setPreview(null)
      toast.success('Profile photo updated successfully.')
    } catch (err) {
      setPreview(null)
      toast.error(err.message || 'Failed to upload photo.')
    } finally {
      setIsUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const avatarSrc = preview || user?.avatar_url
  const initials = user?.username?.[0]?.toUpperCase() || 'A'

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-terracotta flex items-center justify-center border-4 border-ivory-dark shadow-md-warm">
          {avatarSrc ? (
            <img src={avatarSrc} alt={user?.username} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white font-bold text-display-md">{initials}</span>
          )}
        </div>
        {/* Upload overlay button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-terracotta border-2 border-white flex items-center justify-center text-white shadow-md hover:bg-terracotta-600 transition-colors disabled:opacity-60"
          aria-label="Change profile photo"
        >
          {isUploading ? (
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="w-3.5 h-3.5" />
          )}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Info */}
      <div>
        <h2 className="font-display text-heading-md text-forest">{user?.username}</h2>
        <p className="text-body-sm text-stone">{user?.email}</p>
        <p className="text-tiny text-stone mt-1 capitalize">{user?.role?.replace('_', ' ')}</p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isUploading}
          className="mt-3 inline-flex items-center gap-1.5 text-tiny font-semibold text-terracotta hover:underline disabled:opacity-50"
        >
          <Upload className="w-3 h-3" />
          {isUploading ? 'Uploading…' : 'Change photo'}
        </button>
        <p className="text-tiny text-stone/60 mt-1">JPG, PNG or WebP · Max 5MB</p>
      </div>
    </div>
  )
}

// ── Profile Details Section ───────────────────────────────────────────────────
function ProfileDetailsSection({ user, updateUser }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const updated = await updateProfile({
        username: data.username !== user?.username ? data.username : undefined,
        email: data.email !== user?.email ? data.email : undefined,
      })
      updateUser(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      toast.success('Profile updated successfully.')
    } catch (err) {
      toast.error(err.message || 'Failed to update profile.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <User className="w-4 h-4 text-terracotta" />
        <h3 className="font-semibold text-body-md text-forest">Personal Details</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Username"
          placeholder="your_username"
          autoComplete="username"
          error={errors.username?.message}
          leftIcon={<User className="w-4 h-4" />}
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 3, message: 'At least 3 characters' },
            maxLength: { value: 80, message: 'Max 80 characters' },
          })}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          leftIcon={<Mail className="w-4 h-4" />}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
        />
        <div className="sm:col-span-2 flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            loadingText="Saving…"
            disabled={!isDirty || isSubmitting}
          >
            Save Changes
          </Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-body-sm text-success font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

// ── Change Password Section ───────────────────────────────────────────────────
function ChangePasswordSection() {
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
  const newPassword = watch('new_password', '')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await changePassword({
        current_password: data.current_password,
        new_password: data.new_password,
      })
      reset()
      toast.success('Password changed successfully.')
    } catch (err) {
      toast.error(err.message || 'Failed to change password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Lock className="w-4 h-4 text-terracotta" />
        <h3 className="font-semibold text-body-md text-forest">Change Password</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5 max-w-xl">
        <div className="sm:col-span-2">
          <Input
            label="Current Password"
            type={showCurrent ? 'text' : 'password'}
            placeholder="Enter current password"
            autoComplete="current-password"
            error={errors.current_password?.message}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowCurrent(v => !v)} className="text-stone hover:text-forest">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register('current_password', { required: 'Current password is required' })}
          />
        </div>
        <Input
          label="New Password"
          type={showNew ? 'text' : 'password'}
          placeholder="New password"
          autoComplete="new-password"
          error={errors.new_password?.message}
          helperText="At least 8 characters"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button type="button" onClick={() => setShowNew(v => !v)} className="text-stone hover:text-forest">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          {...register('new_password', {
            required: 'New password is required',
            minLength: { value: 8, message: 'At least 8 characters' },
          })}
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="Repeat new password"
          autoComplete="new-password"
          error={errors.confirm_password?.message}
          leftIcon={<Lock className="w-4 h-4" />}
          {...register('confirm_password', {
            required: 'Please confirm your new password',
            validate: v => v === newPassword || 'Passwords do not match',
          })}
        />
        <div className="sm:col-span-2">
          <Button type="submit" variant="secondary" size="md" isLoading={isSubmitting} loadingText="Changing…">
            Change Password
          </Button>
        </div>
      </form>
    </div>
  )
}
