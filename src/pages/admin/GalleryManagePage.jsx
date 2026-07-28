import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit2, Upload, Image as ImageIcon, X, Check } from 'lucide-react'
import { toast } from 'react-toastify'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { getAdminGallery, uploadGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/api/admin'
import { staggerContainer, fadeInUp } from '@/utils/animations'

const CATEGORY_OPTIONS = [
  { value: 'general',    label: 'General' },
  { value: 'education',  label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'feeding',    label: 'Feeding' },
  { value: 'shelter',    label: 'Shelter' },
  { value: 'community',  label: 'Community' },
  { value: 'events',     label: 'Events' },
]

export default function GalleryManagePage() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const data = await getAdminGallery({ per_page: 100 })
      setImages(data.items || [])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image? This cannot be undone.')) return
    try {
      await deleteGalleryImage(id)
      setImages(prev => prev.filter(img => img.id !== id))
      toast.success('Image deleted.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleUploaded = (newImage) => {
    setImages(prev => [newImage, ...prev])
    setShowUpload(false)
  }

  const handleUpdated = (updated) => {
    setImages(prev => prev.map(img => img.id === updated.id ? updated : img))
    setEditingId(null)
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-heading-lg text-forest">Gallery</h1>
            <p className="text-body-sm text-stone mt-1">{images.length} images · Manage your photo gallery</p>
          </div>
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowUpload(true)}>
            Upload Image
          </Button>
        </motion.div>

        {/* Upload modal */}
        <AnimatePresence>
          {showUpload && (
            <UploadModal onClose={() => setShowUpload(false)} onUploaded={handleUploaded} />
          )}
        </AnimatePresence>

        {/* Edit modal */}
        <AnimatePresence>
          {editingId && (
            <EditModal
              image={images.find(i => i.id === editingId)}
              onClose={() => setEditingId(null)}
              onUpdated={handleUpdated}
            />
          )}
        </AnimatePresence>

        {/* Grid */}
        <motion.div variants={fadeInUp}>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-ash/30 rounded-card animate-pulse" />
              ))}
            </div>
          ) : images.length === 0 ? (
            <EmptyState onUpload={() => setShowUpload(true)} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-card overflow-hidden bg-ivory-dark border border-ash/50 aspect-square"
                >
                  <img
                    src={image.cloudinary_url}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/60 transition-all duration-200 flex items-end">
                    <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-white text-tiny font-semibold truncate mb-2">{image.title || 'Untitled'}</p>
                      <span className="inline-block px-2 py-0.5 bg-white/20 rounded-full text-white text-tiny capitalize mb-2">
                        {image.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(image.id)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 hover:bg-white/30 rounded-card text-white text-tiny font-semibold transition-colors"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-danger/70 hover:bg-danger rounded-card text-white text-tiny font-semibold transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
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

function EmptyState({ onUpload }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-ash/30 flex items-center justify-center mb-4">
        <ImageIcon className="w-10 h-10 text-stone" />
      </div>
      <h3 className="font-display text-heading-md text-forest mb-2">No images yet</h3>
      <p className="text-body-sm text-stone mb-6">Upload your first gallery image to get started.</p>
      <Button variant="primary" size="md" leftIcon={<Upload className="w-4 h-4" />} onClick={onUpload}>
        Upload First Image
      </Button>
    </div>
  )
}

function UploadModal({ onClose, onUploaded }) {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('general')
  const [isUploading, setIsUploading] = useState(false)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select an image.')
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      if (title) formData.append('title', title)
      formData.append('category', category)
      const result = await uploadGalleryImage(formData)
      toast.success('Image uploaded successfully.')
      onUploaded(result)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="bg-white rounded-soft shadow-xl-warm p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-heading-md text-forest">Upload Image</h2>
          <button onClick={onClose} className="text-stone hover:text-forest p-1 rounded-card transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dropzone */}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-ash hover:border-terracotta rounded-card p-6 text-center cursor-pointer transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-card" />
            ) : (
              <div className="flex flex-col items-center gap-2 py-4">
                <Upload className="w-8 h-8 text-stone" />
                <p className="text-body-sm text-stone">Click to select image</p>
                <p className="text-tiny text-stone/60">JPG, PNG, WebP · Max 5MB</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
          </div>

          <Input label="Title (optional)" placeholder="e.g. Children at play" value={title} onChange={e => setTitle(e.target.value)} />

          <div>
            <label className="label-base mb-1.5 block">Category</label>
            <Select options={CATEGORY_OPTIONS} value={category} onChange={e => setCategory(e.target.value)} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" size="md" isLoading={isUploading} loadingText="Uploading…" className="flex-1" disabled={!file}>
              Upload
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  )
}

function EditModal({ image, onClose, onUpdated }) {
  const [title, setTitle] = useState(image?.title || '')
  const [category, setCategory] = useState(image?.category || 'general')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const updated = await updateGalleryImage(image.id, { title, category })
      toast.success('Image updated.')
      onUpdated(updated)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="bg-white rounded-soft shadow-xl-warm p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-heading-md text-forest">Edit Image</h2>
          <button onClick={onClose} className="text-stone hover:text-forest p-1"><X className="w-5 h-5" /></button>
        </div>
        {image?.cloudinary_url && (
          <img src={image.cloudinary_url} alt="Preview" className="w-full h-40 object-cover rounded-card mb-4" />
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" placeholder="Image title" value={title} onChange={e => setTitle(e.target.value)} />
          <div>
            <label className="label-base mb-1.5 block">Category</label>
            <Select options={CATEGORY_OPTIONS} value={category} onChange={e => setCategory(e.target.value)} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="ghost" size="md" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSaving} loadingText="Saving…" className="flex-1">
              Save
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  )
}

function ModalBackdrop({ onClose, children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-overlay bg-forest/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
