import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, ZoomIn } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import publicClient from "@/api/client";

const CATEGORIES = [
  "All",
  "Education",
  "Healthcare",
  "Feeding",
  "Shelter",
  "Community",
  "Events",
  "General",
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await publicClient.get("/api/gallery");
        setImages(response.data.data?.images || []);
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const filtered =
    active === "All"
      ? images
      : images.filter(
          (img) => img.category?.toLowerCase() === active.toLowerCase(),
        );

  // Only show categories that actually have images
  const availableCategories = [
    "All",
    ...new Set(
      images
        .map((img) =>
          img.category
            ? img.category.charAt(0).toUpperCase() + img.category.slice(1)
            : null,
        )
        .filter(Boolean),
    ),
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero */}
      <div className="bg-gradient-hero pt-24 pb-20 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-ivory"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
          aria-hidden="true"
        />
        <div className="container-content relative text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeInUp}
              className="text-tiny font-semibold tracking-widest uppercase text-amber mb-3"
            >
              Our Moments
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-display text-display-md text-white mb-4"
            >
              Gallery
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-body-lg text-white/70 max-w-xl mx-auto"
            >
              Glimpses into the lives we touch every day.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="section container-content">
        {/* Category filter — only renders if we have images */}
        {!isLoading && images.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-body-sm font-semibold transition-all duration-200 ${
                  active === cat
                    ? "bg-terracotta text-white shadow-cta"
                    : "bg-white text-stone border border-ash hover:border-terracotta hover:text-terracotta"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-card bg-ash/30 animate-pulse ${i % 3 === 0 ? "aspect-square" : "aspect-video"}`}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-ash/30 flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-stone" aria-hidden="true" />
            </div>
            <h3 className="font-display text-heading-md text-forest mb-2">
              No photos yet
            </h3>
            <p className="text-body-sm text-stone">
              Check back soon — we're adding images.
            </p>
          </div>
        )}

        {/* No results for this filter */}
        {!isLoading && images.length > 0 && filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-body-sm text-stone">
              No images in this category yet.
            </p>
          </div>
        )}

        {/* Image grid */}
        {!isLoading && filtered.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filtered.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className={`${i % 5 === 0 ? "aspect-square" : "aspect-video"} rounded-card overflow-hidden cursor-pointer relative group bg-ash/20`}
                  onClick={() => setLightbox(image)}
                  role="button"
                  aria-label={`View ${image.title || image.category}`}
                >
                  <img
                    src={image.cloudinary_url || image.url}
                    alt={image.title || image.category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn
                      className="w-8 h-8 text-white drop-shadow-lg"
                      aria-hidden="true"
                    />
                  </div>
                  {/* Category badge */}
                  {image.category && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-tiny font-semibold capitalize">
                        {image.category}
                      </p>
                      {image.title && (
                        <p className="text-white/80 text-tiny truncate">
                          {image.title}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-modal flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.cloudinary_url || lightbox.url}
                alt={lightbox.title || lightbox.category}
                className="max-w-full max-h-[75vh] object-contain rounded-soft shadow-2xl"
              />
              {(lightbox.title || lightbox.category) && (
                <div className="mt-4 text-center">
                  {lightbox.title && (
                    <p className="text-white font-semibold text-body-md">
                      {lightbox.title}
                    </p>
                  )}
                  {lightbox.category && (
                    <p className="text-white/60 text-body-sm capitalize mt-1">
                      {lightbox.category}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
