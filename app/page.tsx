import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Clock, MapPin, ChefHat } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'

export const metadata: Metadata = {
  title: 'La Table d\'Or — Restaurant Gastronomique à Paris',
  description: 'Restaurant gastronomique au cœur de Paris. Cuisine française raffinée, produits du terroir sélectionnés.',
}

const specialites = [
  {
    nom: 'Homard Bleu Breton',
    description: 'Rôti au beurre de corail, bisque réduite et fenouil braisé',
    prix: '68€',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
  },
  {
    nom: 'Foie Gras de Canard',
    description: 'Terrine maison, chutney de figue et brioche toastée',
    prix: '28€',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
  },
  {
    nom: 'Soufflé Chocolat Grand Cru',
    description: 'Valrhona 70%, cœur coulant, glace vanille Bourbon',
    prix: '18€',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
  },
]

const temoignages = [
  {
    nom: 'Sophie M.',
    note: 5,
    texte: 'Une soirée absolument mémorable. La cuisine du chef est d\'une précision et d\'une créativité remarquables. Le service, aux petits soins, complète à merveille cette expérience unique.',
    date: 'Décembre 2024',
  },
  {
    nom: 'Thomas B.',
    note: 5,
    texte: 'La Table d\'Or, c\'est l\'alliance parfaite entre tradition française et modernité. Le risotto aux truffes était transcendant. Je reviendrai sans aucun doute.',
    date: 'Novembre 2024',
  },
  {
    nom: 'Marie-Claire D.',
    note: 5,
    texte: 'Cadre feutré et élégant, plats d\'une finesse extrême et carte des vins remarquable. Un restaurant parisien comme on les aime, à découvrir absolument.',
    date: 'Janvier 2025',
  },
]

const galerieTease = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80',
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=85"
          alt="La salle du restaurant La Table d'Or"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/40 to-noir/80" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="section-label text-or/90 mb-6 tracking-widest2">Restaurant Gastronomique · Paris</p>
          <h1 className="font-display text-ivoire text-6xl sm:text-7xl md:text-8xl font-light leading-none mb-4">
            La Table
          </h1>
          <h1 className="font-display text-or text-6xl sm:text-7xl md:text-8xl font-semibold leading-none mb-8" style={{ letterSpacing: '0.06em' }}>
            d'Or
          </h1>
          <div className="gold-line w-24 mx-auto mb-8" />
          <p className="font-body text-ivoire/80 text-lg font-light leading-relaxed mb-10 max-w-md mx-auto">
            Une cuisine française d'exception, sublimée par les produits du terroir et la passion d'un chef étoilé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservation" className="btn-primary">
              Réserver une table <ArrowRight size={16} />
            </Link>
            <Link href="/menu" className="btn-outline-white">
              Découvrir le menu
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-body text-ivoire/40 text-xs tracking-widest uppercase">Défiler</span>
          <div className="w-px h-10 bg-gradient-to-b from-ivoire/40 to-transparent" />
        </div>
      </section>

      {/* ─── PRÉSENTATION ─────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80"
                alt="Chef Aurélien Moreau"
                width={600}
                height={750}
                className="object-cover w-full"
                style={{ aspectRatio: '4/5' }}
              />
              {/* Floating card */}
              <div className="absolute -bottom-8 -right-8 bg-noir px-8 py-6 hidden lg:block">
                <div className="flex items-center gap-3 mb-2">
                  <ChefHat size={18} className="text-or" />
                  <span className="section-label">Chef Étoilé</span>
                </div>
                <p className="font-display text-ivoire text-xl font-light">Aurélien Moreau</p>
                <p className="font-body text-gris text-sm mt-1">2 Étoiles Michelin · 18 ans d'expérience</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={150}>
            <p className="section-label mb-4">Notre Histoire</p>
            <h2 className="display-title text-4xl sm:text-5xl mb-6">
              L'art de recevoir,<br />
              <em className="font-light">revisité</em>
            </h2>
            <div className="gold-line-solid w-12 mb-8" />
            <p className="font-body text-gris leading-relaxed mb-6">
              Fondée en 2008, La Table d'Or est née de la vision du chef Aurélien Moreau : offrir à chaque convive une expérience gastronomique qui éveille les sens et nourrit l'âme. Deux étoiles Michelin plus tard, notre engagement envers l'excellence demeure inchangé.
            </p>
            <p className="font-body text-gris leading-relaxed mb-10">
              Nous travaillons en étroite collaboration avec des producteurs locaux sélectionnés pour leurs pratiques responsables et la qualité irréprochable de leurs produits. Chaque saison, notre carte se réinvente pour célébrer le meilleur du terroir français.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { n: '2', label: 'Étoiles Michelin' },
                { n: '15+', label: 'Producteurs partenaires' },
                { n: '250', label: 'Références de vins' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-or text-3xl font-semibold mb-1">{stat.n}</div>
                  <div className="font-body text-gris text-xs leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/menu" className="btn-outline">
              Voir notre menu <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ─── SPÉCIALITÉS ─────────────────────────────────── */}
      <section className="py-24 bg-anthracite">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal className="text-center mb-16">
            <p className="section-label mb-4">La Carte</p>
            <h2 className="font-display text-ivoire text-4xl sm:text-5xl font-light mb-4">
              Nos <em>Signatures</em>
            </h2>
            <div className="gold-line w-16 mx-auto" />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialites.map((item, i) => (
              <SectionReveal key={item.nom} delay={i * 100}>
                <div className="card-hover group bg-noir overflow-hidden">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={item.img}
                      alt={item.nom}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-or text-noir font-body font-semibold text-sm px-3 py-1">
                      {item.prix}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-ivoire text-2xl font-light mb-2">{item.nom}</h3>
                    <p className="font-body text-gris text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal className="text-center mt-12">
            <Link href="/menu" className="btn-outline">
              Carte complète <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="section-label mb-4">Ils en parlent</p>
            <h2 className="display-title text-4xl sm:text-5xl mb-4">
              L'avis de nos <em className="font-light">convives</em>
            </h2>
            <div className="gold-line w-16 mx-auto" />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {temoignages.map((t, i) => (
              <SectionReveal key={t.nom} delay={i * 100}>
                <div className="bg-ivoire border border-gris-clair p-8 relative">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.note }).map((_, j) => (
                      <Star key={j} size={14} className="fill-or text-or" />
                    ))}
                  </div>
                  <p className="font-display text-noir/80 text-lg font-light leading-relaxed italic mb-6">
                    "{t.texte}"
                  </p>
                  <div className="gold-line-solid mb-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-body font-medium text-sm text-noir">{t.nom}</span>
                    <span className="font-body text-xs text-gris">{t.date}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HORAIRES + RÉSA ─────────────────────────────── */}
      <section className="py-20 bg-noir">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <SectionReveal>
            <p className="section-label text-or/90 mb-4">Nous rejoindre</p>
            <h2 className="font-display text-ivoire text-4xl sm:text-5xl font-light mb-10">
              Réservez votre <em>expérience</em>
            </h2>
          </SectionReveal>

          <SectionReveal delay={100} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-3">
              <Clock size={22} className="text-or" />
              <div>
                <p className="font-body text-ivoire/80 text-sm mb-1">Déjeuner</p>
                <p className="font-body text-gris text-xs">Mar – Ven : 12h – 14h30</p>
                <p className="font-body text-gris text-xs">Dim : 12h – 15h</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Clock size={22} className="text-or" />
              <div>
                <p className="font-body text-ivoire/80 text-sm mb-1">Dîner</p>
                <p className="font-body text-gris text-xs">Mar – Ven : 19h – 23h</p>
                <p className="font-body text-gris text-xs">Sam : 19h – 23h30</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MapPin size={22} className="text-or" />
              <div>
                <p className="font-body text-ivoire/80 text-sm mb-1">Adresse</p>
                <p className="font-body text-gris text-xs">12 Rue du Faubourg</p>
                <p className="font-body text-gris text-xs">Saint-Honoré, Paris 8e</p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={200}>
            <Link href="/reservation" className="btn-primary text-sm">
              Réserver une table <ArrowRight size={16} />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ─── GALERIE TEASER ───────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionReveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label mb-3">Galerie</p>
              <h2 className="display-title text-4xl">En images</h2>
            </div>
            <Link href="/galerie" className="btn-outline self-start sm:self-auto">
              Voir tout <ArrowRight size={16} />
            </Link>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {galerieTease.map((src, i) => (
              <SectionReveal key={i} delay={i * 80}>
                <Link href="/galerie" className="block relative overflow-hidden group" style={{ aspectRatio: '1' }}>
                  <Image
                    src={src}
                    alt={`Photo du restaurant ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-colors duration-300" />
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
