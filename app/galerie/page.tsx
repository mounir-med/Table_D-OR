'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages, categoriesGalerie } from '@/data/gallery'
import SectionReveal from '@/components/SectionReveal'

export default function GaleriePage() {
  const [activeFilter, setActiveFilter] = useState('tous')
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null)

  const filtered = activeFilter === 'tous'
    ? galleryImages
    : galleryImages.filter((img) => img.categorie === activeFilter)

  const openLightbox = (index: number) => setLightbox({ index })
  const closeLightbox = () => setLightbox(null)

  const prev = () => {
    if (!lightbox) return
    setLightbox({ index: (lightbox.index - 1 + filtered.length) % filtered.length })
  }
  const next = () => {
    if (!lightbox) return
    setLightbox({ index: (lightbox.index + 1) % filtered.length })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-noir">
        <Image
          src="https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=1600&q=80"
          alt="Ambiance La Table d'Or"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <p className="section-label text-or/80 mb-4">Nos Images</p>
            <h1 className="font-display text-ivoire text-5xl sm:text-6xl md:text-7xl font-light mb-6">
              La <em>Galerie</em>
            </h1>
            <div className="gold-line w-20 mx-auto mb-6" />
            <p className="font-body text-gris text-base max-w-md mx-auto">
              Plongez dans l'univers de La Table d'Or à travers nos photos : plats, ambiance, équipe et événements.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-ivoire border-b border-gris-clair">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {categoriesGalerie.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-5 font-body text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeFilter === cat.id
                    ? 'border-or text-noir'
                    : 'border-transparent text-gris hover:text-noir'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <SectionReveal key={img.id} delay={(i % 4) * 60}>
                <button
                  onClick={() => openLightbox(i)}
                  className="relative w-full overflow-hidden group block break-inside-avoid mb-4"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-300 flex items-center justify-center">
                    <span className="font-body text-ivoire text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-ivoire/60 px-4 py-2">
                      Agrandir
                    </span>
                  </div>
                </button>
              </SectionReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-gris">Aucune photo dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-noir/97 lightbox-overlay flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-ivoire/60 hover:text-ivoire transition-colors z-10"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 sm:left-8 text-ivoire/60 hover:text-ivoire transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightbox.index].src}
              alt={filtered[lightbox.index].alt}
              width={800}
              height={600}
              className="object-contain max-h-[85vh] w-auto h-auto mx-auto"
            />
            <p className="text-center font-body text-ivoire/50 text-xs mt-4">
              {lightbox.index + 1} / {filtered.length} — {filtered[lightbox.index].alt}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 sm:right-8 text-ivoire/60 hover:text-ivoire transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  )
}
