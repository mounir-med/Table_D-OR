import Link from 'next/link'
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-noir text-ivoire">
      {/* Top gold line */}
      <div className="gold-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="font-display text-ivoire text-2xl font-light leading-none">La Table</div>
              <div className="font-display text-or text-3xl font-semibold leading-none" style={{ letterSpacing: '0.08em' }}>d'Or</div>
            </div>
            <p className="font-body text-sm text-gris leading-relaxed mb-6">
              Une expérience gastronomique unique au cœur de Paris, où chaque plat raconte une histoire.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener" className="w-9 h-9 border border-gris/30 flex items-center justify-center text-gris hover:text-or hover:border-or transition-colors duration-300">
                <Instagram size={15} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="w-9 h-9 border border-gris/30 flex items-center justify-center text-gris hover:text-or hover:border-or transition-colors duration-300">
                <Facebook size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="section-label mb-6">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/menu', label: 'Notre Menu' },
                { href: '/galerie', label: 'Galerie' },
                { href: '/reservation', label: 'Réservation' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-sm text-gris hover:text-or transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="section-label mb-6">Horaires</h3>
            <ul className="space-y-2">
              {[
                { jour: 'Lundi', heure: 'Fermé' },
                { jour: 'Mardi — Vendredi', heure: '12h – 14h30 · 19h – 23h' },
                { jour: 'Samedi', heure: '19h – 23h30' },
                { jour: 'Dimanche', heure: '12h – 15h' },
              ].map((h, i) => (
                <li key={i} className="flex flex-col gap-0.5">
                  <span className="font-body text-xs text-gris/70">{h.jour}</span>
                  <span className={`font-body text-sm ${h.heure === 'Fermé' ? 'text-gris/50' : 'text-ivoire/80'}`}>{h.heure}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="section-label mb-6">Nous Trouver</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin size={14} className="text-or mt-0.5 shrink-0" />
                <span className="font-body text-sm text-gris leading-relaxed">12 Rue du Faubourg Saint-Honoré<br />75008 Paris, France</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={14} className="text-or shrink-0" />
                <a href="tel:+33142600000" className="font-body text-sm text-gris hover:text-or transition-colors">+33 1 42 60 00 00</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-or shrink-0" />
                <a href="mailto:contact@latabledorsupport.fr" className="font-body text-sm text-gris hover:text-or transition-colors">contact@latabledorsupport.fr</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-line mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-gris/60">
            © {new Date().getFullYear()} La Table d'Or. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-body text-xs text-gris/60 hover:text-or transition-colors">Mentions légales</Link>
            <Link href="#" className="font-body text-xs text-gris/60 hover:text-or transition-colors">CGU</Link>
            <Link href="#" className="font-body text-xs text-gris/60 hover:text-or transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
