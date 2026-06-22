import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: {
    default: 'La Table d\'Or — Restaurant Gastronomique à Paris',
    template: '%s | La Table d\'Or',
  },
  description: 'Restaurant gastronomique au cœur de Paris. Cuisine française raffinée, produits du terroir sélectionnés, cave à vins d\'exception. Réservez votre table.',
  keywords: ['restaurant gastronomique Paris', 'cuisine française', 'restaurant étoilé', 'la table d\'or'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'La Table d\'Or',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
