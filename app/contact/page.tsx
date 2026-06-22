'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Navigation, CheckCircle } from 'lucide-react'
import SectionReveal from '@/components/SectionReveal'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [errors, setErrors] = useState<typeof form>({ nom: '', email: '', sujet: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof typeof errors]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    const errs = { nom: '', email: '', sujet: '', message: '' }
    if (!form.nom.trim()) errs.nom = 'Requis'
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Email invalide'
    if (!form.sujet.trim()) errs.sujet = 'Requis'
    if (!form.message.trim()) errs.message = 'Requis'
    if (Object.values(errs).some(Boolean)) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-noir">
        <Image
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1600&q=80"
          alt="Bar du restaurant"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <p className="section-label text-or/80 mb-4">Nous Écrire</p>
            <h1 className="font-display text-ivoire text-5xl sm:text-6xl font-light mb-6">
              <em>Contact</em>
            </h1>
            <div className="gold-line w-20 mx-auto mb-6" />
            <p className="font-body text-gris max-w-md mx-auto">
              Une question, un événement privatif ou simplement l'envie de nous rejoindre ? Nous sommes à votre écoute.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info column */}
          <SectionReveal>
            <div className="space-y-12">
              <div>
                <h2 className="display-title text-3xl mb-8">Trouvez-nous</h2>
                <div className="space-y-6">
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 border border-or flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-or" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-noir text-sm mb-1">Adresse</p>
                      <p className="font-body text-gris text-sm leading-relaxed">
                        12 Rue du Faubourg Saint-Honoré<br />
                        75008 Paris, France
                      </p>
                      <a
                        href="https://maps.google.com/?q=12+Rue+du+Faubourg+Saint-Honoré+Paris"
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 font-body text-or text-xs mt-2 hover:text-or-clair transition-colors"
                      >
                        <Navigation size={12} /> Ouvrir dans Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 border border-or flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-or" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-noir text-sm mb-1">Téléphone</p>
                      <a href="tel:+33142600000" className="font-body text-gris text-sm hover:text-or transition-colors">+33 1 42 60 00 00</a>
                    </div>
                  </div>

                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 border border-or flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-or" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-noir text-sm mb-1">Email</p>
                      <a href="mailto:contact@latabledorsupport.fr" className="font-body text-gris text-sm hover:text-or transition-colors">contact@latabledorsupport.fr</a>
                    </div>
                  </div>

                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 border border-or flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-or" />
                    </div>
                    <div>
                      <p className="font-body font-medium text-noir text-sm mb-3">Horaires</p>
                      <div className="space-y-1.5">
                        {[
                          { j: 'Lundi', h: 'Fermé' },
                          { j: 'Mardi – Vendredi', h: '12h – 14h30 · 19h – 23h' },
                          { j: 'Samedi', h: '19h – 23h30' },
                          { j: 'Dimanche', h: '12h – 15h (déjeuner uniquement)' },
                        ].map((item) => (
                          <div key={item.j} className="flex gap-4">
                            <span className="font-body text-gris/60 text-xs w-28 shrink-0">{item.j}</span>
                            <span className={`font-body text-xs ${item.h === 'Fermé' ? 'text-gris/40' : 'text-noir'}`}>{item.h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux */}
              <div>
                <p className="section-label mb-5">Réseaux sociaux</p>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener"
                    className="flex items-center gap-3 border border-gris-clair px-5 py-3 hover:border-or group transition-colors duration-300">
                    <Instagram size={16} className="text-gris group-hover:text-or transition-colors" />
                    <span className="font-body text-xs text-gris group-hover:text-noir transition-colors">@latabledorofficiel</span>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener"
                    className="flex items-center gap-3 border border-gris-clair px-5 py-3 hover:border-or group transition-colors duration-300">
                    <Facebook size={16} className="text-gris group-hover:text-or transition-colors" />
                    <span className="font-body text-xs text-gris group-hover:text-noir transition-colors">La Table d'Or</span>
                  </a>
                </div>
              </div>

              {/* CTA Réservation */}
              <div className="bg-anthracite p-8">
                <h3 className="font-display text-ivoire text-2xl font-light mb-3">Réserver une table</h3>
                <p className="font-body text-gris text-sm mb-6">Pour réserver votre table directement en ligne, utilisez notre formulaire de réservation.</p>
                <Link href="/reservation" className="btn-primary text-sm">
                  Réserver maintenant
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Contact form */}
          <SectionReveal delay={100}>
            <h2 className="display-title text-3xl mb-10">Nous écrire</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle size={48} className="text-or mb-6" />
                <h3 className="font-display text-noir text-2xl font-light mb-3">Message envoyé !</h3>
                <p className="font-body text-gris text-sm">Nous vous répondrons dans les plus brefs délais, généralement sous 24h.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Votre nom *</label>
                    <input name="nom" value={form.nom} onChange={handleChange} placeholder="Jean Dupont" className="input-field" />
                    {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.fr" className="input-field" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Sujet *</label>
                  <input name="sujet" value={form.sujet} onChange={handleChange} placeholder="Privatisation de salle, partenariat…" className="input-field" />
                  {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet}</p>}
                </div>
                <div>
                  <label className="font-body text-xs text-gris uppercase tracking-wider block mb-2">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Décrivez votre demande…" className="textarea-field" style={{ minHeight: 160 }} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="w-4 h-4 border-2 border-noir/30 border-t-noir rounded-full animate-spin" />
                      Envoi en cours…
                    </span>
                  ) : 'Envoyer le message'}
                </button>
              </div>
            )}
          </SectionReveal>
        </div>
      </section>

      {/* Google Maps */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.7!2d2.3203!3d48.8697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc3c3ba4f89%3A0x3c5cdd7b57a6c3b2!2sRue+du+Faubourg+Saint-Honor%C3%A9%2C+Paris!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte La Table d'Or"
        />
      </section>
    </>
  )
}
