import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, X, LayoutGrid } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getAdminPrograms, createProgram, updateProgram, deleteProgram } from '@/api/admin'
import { staggerContainer, fadeInUp } from '@/utils/animations'

export default function ProgramsManagePage() {
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [editingProgram, setEditingProgram] = useState(null)

  const fetchPrograms = async () => {
    setIsLoading(true)
    try {
      const data = await getAdminPrograms({ per_page: 50 })
      setPrograms(data.items || [])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchPrograms() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program? This cannot be undone.')) return
    try {
      await deleteProgram(id)
      setPrograms(prev => prev.filter(p => p.id !== id))
      toast.success('Program deleted.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleCreated = (prog) => {
    setPrograms(prev => [prog, ...prev])
    setShowCreate(false)
  }

  const handleUpdated = (updated) => {
    setPrograms(prev => prev.map(p => p.id === updated.id ? updated : p))
    setEditingProgram(null)
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-heading-lg text-forest">Programs</h1>
            <p className="text-body-sm text-stone mt-1">{programs.length} programs · Manage what you offer</p>
          </div>
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowCreate(true)}>
            Add Program
          </Button>
        </motion.div>

        <AnimatePresence>
          {showCreate && (
            <ProgramModal title="Add Program" onClose={() => setShowCreate(false)} onSaved={handleCreated} />
          )}
          {editingProgram && (
            <ProgramModal title="Edit Program" program={editingProgram} onClose={() => setEditingProgram(null)} onSaved={handleUpdated} />
          )}
        </AnimatePresence>

        {/* Programs list */}
        <motion.div variants={fadeInUp}>
          {isLoading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-card shadow-sm-warm p-5 animate-pulse">
                  <div className="h-5 bg-ash/40 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-ash/30 rounded w-full mb-2" />
                  <div className="h-3 bg-ash/30 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : programs.length === 0 ? (
            <EmptyState onAdd={() => setShowCreate(true)} />
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {programs.map((program) => (
                <motion.div
                  key={program.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-card shadow-sm-warm overflow-hidden"
                >
                  {program.photo_url && (
                    <div className="h-36 overflow-hidden">
                      <img src={program.photo_url} alt={program.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-heading-md text-forest leading-snug">{program.title}</h3>
                      {program.is_active && (
                        <span className="px-2 py-0.5 bg-success/10 text-success rounded-full text-tiny font-semibold flex-shrink-0">Active</span>
                      )}
                    </div>
                    <p className="text-body-sm text-stone leading-relaxed line-clamp-3 mb-4">{program.description}</p>
                    {program.beneficiary_count && (
                      <p className="text-tiny text-stone mb-3">
                        <span className="font-bold text-terracotta">{program.beneficiary_count}</span> beneficiaries
                      </p>
                    )}
                    <div className="flex gap-3 pt-3 border-t border-ash/50">
                      <button
                        onClick={() => setEditingProgram(program)}
                        className="flex items-center gap-1 text-tiny font-semibold text-terracotta hover:underline"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
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
        <LayoutGrid className="w-10 h-10 text-stone" />
      </div>
      <h3 className="font-display text-heading-md text-forest mb-2">No programs yet</h3>
      <p className="text-body-sm text-stone mb-6">Add the programs your organization runs to showcase your impact.</p>
      <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={onAdd}>Add First Program</Button>
    </div>
  )
}

function ProgramModal({ title, program, onClose, onSaved }) {
  const fileRef = useRef(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(program?.photo_url || null)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState({
    title: program?.title || '',
    description: program?.description || '',
    beneficiary_count: program?.beneficiary_count || '',
    is_active: program?.is_active !== false,
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
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append('title', form.title.trim())
      formData.append('description', form.description.trim())
      if (form.beneficiary_count) formData.append('beneficiary_count', form.beneficiary_count)
      formData.append('is_active', form.is_active ? 'true' : 'false')
      if (photoFile) formData.append('photo', photoFile)

      let result
      if (program) {
        result = await updateProgram(program.id, formData)
      } else {
        result = await createProgram(formData)
      }
      toast.success(program ? 'Program updated.' : 'Program created.')
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
          {/* Photo */}
          <div>
            <label className="label-base mb-1.5 block">Cover Photo (optional)</label>
            {photoPreview ? (
              <div className="relative">
                <img src={photoPreview} alt="Preview" className="w-full h-36 object-cover rounded-card" />
                <button
                  type="button"
                  onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                  className="absolute top-2 right-2 bg-danger text-white rounded-full p-1 shadow"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed border-ash hover:border-terracotta rounded-card p-5 text-center cursor-pointer transition-colors"
              >
                <p className="text-body-sm text-stone">Click to upload cover photo</p>
                <p className="text-tiny text-stone/60">JPG, PNG, WebP · Max 5MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
          </div>

          <Input
            label="Program Title *"
            placeholder="e.g. Education Support Program"
            error={errors.title}
            {...field('title')}
          />

          <div>
            <label className="label-base mb-1.5 block">Description *</label>
            <textarea
              rows={4}
              placeholder="Describe what this program does and who it helps…"
              className={`w-full font-body text-body-md text-forest bg-white border rounded-card px-4 py-3 placeholder:text-stone/60 transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${errors.description ? 'border-danger focus:ring-danger/20' : 'border-ash focus:border-terracotta focus:ring-terracotta/20'}`}
              {...field('description')}
            />
            {errors.description && <p className="text-tiny text-danger mt-1">{errors.description}</p>}
          </div>

          <Input
            label="Number of Beneficiaries"
            type="number"
            placeholder="e.g. 150"
            {...field('beneficiary_count')}
          />

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
              className="w-4 h-4 rounded accent-terracotta"
            />
            <span className="text-body-sm text-forest">Program is currently active</span>
          </label>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSaving} loadingText="Saving…" className="flex-1">
              {program ? 'Save Changes' : 'Create Program'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
