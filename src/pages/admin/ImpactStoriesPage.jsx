import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, X, BookOpen, Quote } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getAdminImpactStories, createImpactStory, updateImpactStory, deleteImpactStory } from '@/api/admin'
import { staggerContainer, fadeInUp } from '@/utils/animations'
import { formatDate } from '@/utils/formatters'

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [editingStory, setEditingStory] = useState(null)

  const fetchStories = async () => {
    setIsLoading(true)
    try {
      const data = await getAdminImpactStories({ per_page: 50 })
      setStories(data.items || [])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchStories() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this story? This cannot be undone.')) return
    try {
      await deleteImpactStory(id)
      setStories(prev => prev.filter(s => s.id !== id))
      toast.success('Story deleted.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleCreated = (story) => {
    setStories(prev => [story, ...prev])
    setShowCreate(false)
  }

  const handleUpdated = (updated) => {
    setStories(prev => prev.map(s => s.id === updated.id ? updated : s))
    setEditingStory(null)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-heading-lg text-forest">Impact Stories</h1>
            <p className="text-body-sm text-stone mt-1">{stories.length} stories · Voices of change</p>
          </div>
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowCreate(true)}>
            Add Story
          </Button>
        </motion.div>

        <AnimatePresence>
          {showCreate && (
            <StoryModal title="Add Impact Story" onClose={() => setShowCreate(false)} onSaved={handleCreated} />
          )}
          {editingStory && (
            <StoryModal title="Edit Story" story={editingStory} onClose={() => setEditingStory(null)} onSaved={handleUpdated} />
          )}
        </AnimatePresence>

        {/* Stories list */}
        <motion.div variants={fadeInUp}>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card shadow-sm-warm p-5 animate-pulse">
                  <div className="h-4 bg-ash/40 rounded w-1/3 mb-3" />
                  <div className="h-3 bg-ash/30 rounded w-full mb-2" />
                  <div className="h-3 bg-ash/30 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <EmptyState onAdd={() => setShowCreate(true)} />
          ) : (
            <div className="space-y-4">
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-card shadow-sm-warm p-5 flex gap-4"
                >
                  {/* Avatar/Photo */}
                  <div className="flex-shrink-0">
                    {story.photo_url ? (
                      <img src={story.photo_url} alt={story.name} className="w-14 h-14 rounded-full object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-terracotta/10 flex items-center justify-center">
                        <span className="text-terracotta font-bold text-heading-md">{story.name?.[0]?.toUpperCase() || '?'}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="font-semibold text-body-md text-forest">{story.name}</h3>
                        <p className="text-tiny text-stone capitalize">{story.role || '—'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {story.is_featured && (
                          <span className="px-2 py-0.5 bg-amber/20 text-amber-600 rounded-full text-tiny font-semibold">Featured</span>
                        )}
                        <span className="text-tiny text-stone">{formatDate(story.created_at)}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-start gap-1.5">
                      <Quote className="w-3 h-3 text-terracotta/50 flex-shrink-0 mt-1" />
                      <p className="text-body-sm text-stone leading-relaxed line-clamp-2">{story.quote}</p>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => setEditingStory(story)}
                        className="flex items-center gap-1 text-tiny font-semibold text-terracotta hover:underline"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(story.id)}
                        className="flex items-center gap-1 text-tiny font-semibold text-danger hover:underline"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-ash/30 flex items-center justify-center mb-4">
        <BookOpen className="w-10 h-10 text-stone" />
      </div>
      <h3 className="font-display text-heading-md text-forest mb-2">No stories yet</h3>
      <p className="text-body-sm text-stone mb-6">Share the voices of children and families you've impacted.</p>
      <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={onAdd}>Add First Story</Button>
    </div>
  )
}

function StoryModal({ title, story, onClose, onSaved }) {
  const fileRef = useRef(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(story?.photo_url || null)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    name: story?.name || '',
    role: story?.role || '',
    quote: story?.quote || '',
    is_featured: story?.is_featured || false,
  })
  const [errors, setErrors] = useState({})

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setPhotoFile(f)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(f)
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.quote.trim()) errs.quote = 'Quote is required'
    if (form.quote.trim().length < 20) errs.quote = 'Quote must be at least 20 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name.trim())
      formData.append('role', form.role.trim())
      formData.append('quote', form.quote.trim())
      formData.append('is_featured', form.is_featured ? 'true' : 'false')
      if (photoFile) formData.append('photo', photoFile)

      let result
      if (story) {
        result = await updateImpactStory(story.id, formData)
      } else {
        result = await createImpactStory(formData)
      }
      toast.success(story ? 'Story updated.' : 'Story created.')
      onSaved(result)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const field = (key) => ({
    value: form[key],
    onChange: (e) => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })) },
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-overlay bg-forest/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-soft shadow-xl-warm p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-heading-md text-forest">{title}</h2>
          <button onClick={onClose} className="text-stone hover:text-forest p-1"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo upload */}
          <div>
            <label className="label-base mb-1.5 block">Photo (optional)</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-ash/30 flex items-center justify-center border border-ash flex-shrink-0">
                {photoPreview
                  ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  : <span className="text-stone text-body-md">?</span>}
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-tiny font-semibold text-terracotta hover:underline"
              >
                {photoPreview ? 'Change photo' : 'Upload photo'}
              </button>
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
            </div>
          </div>

          <Input
            label="Name *"
            placeholder="e.g. Jane Wanjiku"
            error={errors.name}
            {...field('name')}
          />
          <Input
            label="Role / Description"
            placeholder="e.g. Former beneficiary, now mentor"
            {...field('role')}
          />
          <div>
            <label className="label-base mb-1.5 block">Quote *</label>
            <textarea
              rows={4}
              placeholder="Their story in their own words…"
              className={`w-full font-body text-body-md text-forest bg-white border rounded-card px-4 py-3 placeholder:text-stone/60 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${errors.quote ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-ash focus:border-terracotta focus:ring-terracotta/20'}`}
              {...field('quote')}
            />
            {errors.quote && <p className="text-tiny text-danger mt-1">{errors.quote}</p>}
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => setForm(f => ({ ...f, is_featured: e.target.checked }))}
              className="w-4 h-4 rounded accent-terracotta"
            />
            <span className="text-body-sm text-forest">Feature this story on the homepage</span>
          </label>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSaving} loadingText="Saving…" className="flex-1">
              {story ? 'Save Changes' : 'Create Story'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
