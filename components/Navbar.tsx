'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/menu', label: 'Menu' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/reservation', label: 'Réservation' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const navBg = isHome
    ? scrolled
      ? 'bg-noir/97 backdrop-blur-sm'
      : 'bg-transparent'
    : 'bg-noir'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        {/* Ligne dorée en bas du header */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${scrolled || !isHome ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }}
        />

        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-display text-ivoire text-xl font-light leading-none tracking-wide">La Table</span>
            <span className="font-display text-or text-2xl font-semibold leading-none" style={{ letterSpacing: '0.08em' }}>d'Or</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link font-body text-xs tracking-widest uppercase font-medium transition-colors duration-300 ${
                    pathname === link.href ? 'text-or active' : 'text-ivoire/80 hover:text-ivoire'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <Link
              href="/reservation"
              className="hidden lg:inline-flex btn-primary text-xs py-3 px-6"
            >
              Réserver
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-ivoire p-1"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-noir flex flex-col transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6">
          <Link href="/" className="flex flex-col items-start">
            <span className="font-display text-ivoire text-xl font-light leading-none">La Table</span>
            <span className="font-display text-or text-2xl font-semibold leading-none">d'Or</span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-ivoire">
            <X size={22} />
          </button>
        </div>
        <div className="gold-line mx-6" />

        <ul className="flex flex-col justify-center flex-1 px-8 gap-8">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="overflow-hidden"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Link
                href={link.href}
                className={`font-display text-4xl font-light transition-colors duration-300 block ${
                  pathname === link.href ? 'text-or' : 'text-ivoire hover:text-or'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-8 pb-12">
          <div className="gold-line mb-8" />
          <p className="font-body text-gris text-sm">12 Rue du Faubourg Saint-Honoré</p>
          <p className="font-body text-gris text-sm">+33 1 42 60 00 00</p>
        </div>
      </div>
    </>
  )
}
