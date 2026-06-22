'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Sparkles, Waves } from 'lucide-react'
import { menuData, categories } from '@/data/menu'
import SectionReveal from '@/components/SectionReveal'

const tagConfig: Record<string, { label: string; color: string }> = {
  signature: { label: 'Signature', color: 'bg-or text-noir' },
  végétarien: { label: 'Végétarien', color: 'bg-green-800/80 text-green-100' },
  premium: { label: 'Premium', color: 'bg-violet-900/80 text-violet-100' },
  mer: { label: 'Mer', color: 'bg-blue-900/80 text-blue-100' },
  blanc: { label: 'Blanc', color: 'bg-yellow-100 text-yellow-900' },
  rouge: { label: 'Rouge', color: 'bg-red-900/80 text-red-100' },
  champagne: { label: 'Champagne', color: 'bg-yellow-800/80 text-yellow-100' },
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('entrees')

  const items = menuData[activeCategory as keyof typeof menuData] || []

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-noir overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=1600&q=80"
          alt="Notre cuisine"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <p className="section-label text-or/80 mb-4">La Cuisine</p>
            <h1 className="font-display text-ivoire text-5xl sm:text-6xl md:text-7xl font-light mb-6">
              Notre <em>Menu</em>
            </h1>
            <div className="gold-line w-20 mx-auto mb-6" />
            <p className="font-body text-gris text-base leading-relaxed max-w-lg mx-auto">
              Une carte qui évolue au fil des saisons, composée avec les meilleurs produits de nos artisans partenaires.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Category tabs */}
      <div className="sticky top-20 z-30 bg-ivoire border-b border-gris-clair">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-5 font-body text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 border-b-2 ${
                  activeCategory === cat.id
                    ? 'border-or text-noir'
                    : 'border-transparent text-gris hover:text-noir'
                }`}
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {items.map((item: any, i: number) => (
              <SectionReveal key={item.id} delay={i * 60}>
                <div className="group py-8 px-6 border-b border-gris-clair/60 hover:bg-ivoire/60 transition-colors duration-300">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-display text-noir text-xl font-medium">{item.nom}</h3>
                        {item.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className={`font-body text-xs px-2 py-0.5 ${tagConfig[tag]?.color || 'bg-gris-clair text-gris'}`}
                          >
                            {tagConfig[tag]?.label || tag}
                          </span>
                        ))}
                      </div>
                      <p className="font-body text-gris text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="shrink-0 font-display text-or text-xl font-semibold">
                      {item.prix}€
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menus dégustations */}
      <section className="py-24 bg-anthracite">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <p className="section-label text-or/80 mb-4">Expérience Complète</p>
            <h2 className="font-display text-ivoire text-4xl font-light mb-4">Menus Dégustation</h2>
            <div className="gold-line w-16 mx-auto" />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                nom: 'Menu Découverte',
                prix: '95',
                description: 'Une invitation aux grandes saveurs de la maison',
                plats: ['1 entrée au choix', '1 plat au choix', '1 dessert au choix', 'Mignardises'],
              },
              {
                nom: 'Menu Prestige',
                prix: '165',
                description: 'L\'expression ultime du savoir-faire du Chef',
                plats: ['2 amuse-bouches', '2 entrées en duo', '1 plat signature', '1 pré-dessert', '1 dessert grand cru', 'Mignardises et café'],
              },
            ].map((menu, i) => (
              <SectionReveal key={menu.nom} delay={i * 100}>
                <div className="border border-gris/30 p-10 relative">
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-or text-noir font-body text-xs px-4 py-1 tracking-widest uppercase">
                      Recommandé
                    </div>
                  )}
                  <h3 className="font-display text-ivoire text-2xl font-light mb-2">{menu.nom}</h3>
                  <p className="font-body text-gris text-sm mb-6">{menu.description}</p>
                  <div className="font-display text-or text-4xl font-semibold mb-8">{menu.prix}€ <span className="font-body text-gris text-sm font-normal">/ personne</span></div>
                  <ul className="space-y-3 mb-8">
                    {menu.plats.map((p) => (
                      <li key={p} className="flex items-center gap-3 font-body text-sm text-ivoire/70">
                        <span className="w-1 h-1 bg-or rounded-full shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/reservation" className="btn-outline w-full justify-center">
                    Réserver <ArrowRight size={16} />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Allergens note */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-body text-gris text-sm text-center leading-relaxed">
            Informez votre serveur de toute allergie ou intolérances alimentaire. Nos plats peuvent contenir des traces de gluten, lactose, fruits à coque et crustacés.<br />
            <span className="text-xs text-gris/60">Prix TTC, service compris. Carte susceptible d'évoluer selon les saisons et les arrivages.</span>
          </p>
        </div>
      </section>
    </>
  )
}
