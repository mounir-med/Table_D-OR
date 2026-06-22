'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CheckCircle, Phone, Clock, MapPin } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'

type FormData = {
  prenom: string
  nom: string
  email: string
  telephone: string
  date: string
  heure: string
  personnes: string
  occasion: string
  demandes: string
}

const heures = ['12:00', '12:30', '13:00', '13:30', '14:00', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00']
const occasions = ['Aucune occasion particulière', 'Anniversaire', 'Dîner romantique', 'Repas d\'affaires', 'Demande en mariage', 'Célébration familiale', 'Autre']

const getTodayString = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

export default function ReservationPage() {
  const [form, setForm] = useState<FormData>({
    prenom: '', nom: '', email: '', telephone: '',
    date: '', heure: '', personnes: '2', occasion: '', demandes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errs: Partial<FormData> = {}
    if (!form.prenom.trim()) errs.prenom = 'Prénom requis'
    if (!form.nom.trim()) errs.nom = 'Nom requis'
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Email invalide'
    if (!form.telephone.match(/^[\d\s\+\-\(\)]{8,}$/)) errs.telephone = 'Téléphone invalide'
    if (!form.date) errs.date = 'Date requise'
    if (!form.heure) errs.heure = 'Heure requise'
    if (!form.personnes) errs.personnes = 'Nombre requis'
    return errs
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center px-6 py-24">
        <div className="max-w-lg text-center">
          <CheckCircle size={56} className="text-or mx-auto mb-8" />
          <h2 className="font-display text-ivoire text-4xl font-light mb-4">Réservation confirmée</h2>
          <div className="gold-line w-16 mx-auto mb-6" />
          <p className="font-body text-gris leading-relaxed mb-4">
            Merci <span className="text-ivoire">{form.prenom} {form.nom}</span> ! Votre table pour <span className="text-ivoire">{form.personnes} personne{parseInt(form.personnes) > 1 ? 's' : ''}</span> est réservée le <span className="text-ivoire">{new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span> à <span className="text-ivoire">{form.heure}</span>.
          </p>
          <p className="font-body text-gris text-sm mb-10">
            Un email de confirmation a été envoyé à <span className="text-or">{form.email}</span>. Nous vous appellerons si nécessaire au {form.telephone}.
          </p>
          <a href="/" className="btn-outline">
            Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-noir">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Table élégamment dressée"
          fill
          className="object-cover opacity-15"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <p className="section-label text-or/80 mb-4">Votre Expérience</p>
            <h1 className="font-display text-ivoire text-5xl sm:text-6xl font-light mb-6">
              Réserver <em>votre table</em>
            </h1>
            <div className="gold-line w-20 mx-auto mb-6" />
            <p className="font-body text-gris max-w-md mx-auto">
              Pour toute demande de groupe de plus de 8 personnes ou événement privatif, contactez-nous directement.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            <SectionReveal>
              <h2 className="display-title text-2xl mb-10">Vos informations</h2>
            </SectionReveal>

            <div className="space-y-10">
              {/* Identité */}
              <SectionReveal delay={60}>
                <p className="section-label mb-6">Identité</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Prénom *</label>
                    <input name="prenom" value={form.prenom} onChange={handleChange} placeholder="Marie" className="input-field" />
                    {errors.prenom && <p className="font-body text-red-500 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Nom *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} placeholder="Dupont" className="input-field" />
                    {errors.nom && <p className="font-body text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="marie@exemple.fr" className="input-field" />
                    {errors.email && <p className="font-body text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Téléphone *</label>
                    <input name="telephone" type="tel" value={form.telephone} onChange={handleChange} placeholder="+33 6 00 00 00 00" className="input-field" />
                    {errors.telephone && <p className="font-body text-red-500 text-xs mt-1">{errors.telephone}</p>}
                  </div>
                </div>
              </SectionReveal>

              {/* Date & heure */}
              <SectionReveal delay={120}>
                <p className="section-label mb-6">Date & Heure</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Date *</label>
                    <input
                      name="date"
                      type="date"
                      min={getTodayString()}
                      value={form.date}
                      onChange={handleChange}
                      className="input-field"
                    />
                    {errors.date && <p className="font-body text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Heure *</label>
                    <select name="heure" value={form.heure} onChange={handleChange} className="select-field">
                      <option value="">Choisir</option>
                      <optgroup label="Déjeuner">
                        {heures.slice(0, 5).map((h) => <option key={h} value={h}>{h}</option>)}
                      </optgroup>
                      <optgroup label="Dîner">
                        {heures.slice(5).map((h) => <option key={h} value={h}>{h}</option>)}
                      </optgroup>
                    </select>
                    {errors.heure && <p className="font-body text-red-500 text-xs mt-1">{errors.heure}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Personnes *</label>
                    <select name="personnes" value={form.personnes} onChange={handleChange} className="select-field">
                      {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </SectionReveal>

              {/* Occasion & demandes */}
              <SectionReveal delay={180}>
                <p className="section-label mb-6">Occasion & Demandes spéciales</p>
                <div className="space-y-8">
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Occasion</label>
                    <select name="occasion" value={form.occasion} onChange={handleChange} className="select-field">
                      <option value="">Sélectionner</option>
                      {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Demandes particulières</label>
                    <textarea
                      name="demandes"
                      value={form.demandes}
                      onChange={handleChange}
                      placeholder="Allergies, régimes alimentaires, table près de la fenêtre, surprise pour un anniversaire…"
                      className="textarea-field"
                    />
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={240}>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="w-4 h-4 border-2 border-noir/30 border-t-noir rounded-full animate-spin" />
                      Confirmation en cours…
                    </span>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </button>
                <p className="font-body text-xs text-gris mt-4">
                  En confirmant, vous acceptez notre politique d'annulation (48h à l'avance).
                </p>
              </SectionReveal>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-1">
            <SectionReveal delay={100}>
              <div className="bg-anthracite p-8 sticky top-28">
                <h3 className="font-display text-ivoire text-2xl font-light mb-6">Informations pratiques</h3>
                <div className="gold-line-solid mb-8" />

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <Clock size={18} className="text-or shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-ivoire text-sm font-medium mb-2">Horaires</p>
                      <p className="font-body text-gris text-xs leading-loose">
                        Mar – Ven : 12h – 14h30<br />
                        Mar – Ven : 19h – 23h<br />
                        Samedi : 19h – 23h30<br />
                        Dimanche : 12h – 15h<br />
                        <span className="text-gris/50">Lundi : Fermé</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin size={18} className="text-or shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-ivoire text-sm font-medium mb-2">Adresse</p>
                      <p className="font-body text-gris text-xs leading-relaxed">
                        12 Rue du Faubourg Saint-Honoré<br />
                        75008 Paris, France<br />
                        Métro : Concorde (L1, L8, L12)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone size={18} className="text-or shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body text-ivoire text-sm font-medium mb-2">Téléphone</p>
                      <a href="tel:+33142600000" className="font-body text-gris text-xs hover:text-or transition-colors">
                        +33 1 42 60 00 00
                      </a>
                    </div>
                  </div>
                </div>

                <div className="gold-line-solid my-8" />
                <p className="font-body text-gris text-xs leading-relaxed">
                  Pour les groupes de 8+ personnes ou pour privatiser le restaurant, contactez-nous directement par téléphone ou email.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  )
}
