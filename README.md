# La Table d'Or — Site Vitrine Restaurant

Site vitrine gastronomique développé avec **Next.js 14**, **TypeScript** et **Tailwind CSS**.

---

## 🏗️ Architecture du projet

```
la-table-dor/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine (Navbar + Footer + BackToTop)
│   ├── globals.css               # Styles globaux + Google Fonts + classes utilitaires
│   ├── page.tsx                  # Page Accueil (/)
│   ├── menu/
│   │   └── page.tsx              # Page Menu (/menu) — onglets par catégorie
│   ├── galerie/
│   │   └── page.tsx              # Page Galerie (/galerie) — filtres + lightbox
│   ├── reservation/
│   │   └── page.tsx              # Page Réservation (/reservation) — formulaire validé
│   └── contact/
│       └── page.tsx              # Page Contact (/contact) — formulaire + Maps
│
├── components/                   # Composants réutilisables
│   ├── Navbar.tsx                # Header sticky, transparent → opaque au scroll, burger mobile
│   ├── Footer.tsx                # Footer complet avec liens, horaires, réseaux
│   ├── BackToTop.tsx             # Bouton retour en haut (apparaît après 400px)
│   └── SectionReveal.tsx        # Wrapper pour animations d'entrée au scroll (IntersectionObserver)
│
├── data/                         # Données statiques (modifiables facilement)
│   ├── menu.js                   # Entrées, plats, desserts, vins avec prix et tags
│   └── gallery.js                # Images de la galerie avec catégories et métadonnées
│
├── public/
│   └── images/                   # Dossier pour vos propres images locales
│
├── next.config.js                # Config Next.js (domaines images autorisés)
├── tailwind.config.js            # Palette custom, polices, animations
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dépendances
```

---

## 🚀 Installation et lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Ouvrir http://localhost:3000
```

---

## 📦 Stack technique

| Technologie | Usage |
|-------------|-------|
| **Next.js 14** (App Router) | Framework React, routing, SSR, optimisation images |
| **TypeScript** | Typage statique |
| **Tailwind CSS** | Styling utility-first |
| **Lucide React** | Icônes SVG cohérentes |
| **Google Fonts** | Cormorant Garamond (titres) + DM Sans (corps) |

---

## 🎨 Design System

### Palette
| Nom | Hex | Usage |
|-----|-----|-------|
| `noir` | `#0A0A0A` | Fond sombre, textes |
| `ivoire` | `#FAFAF7` | Fond clair, textes sur fond sombre |
| `or` | `#C9A84C` | Couleur signature, accents, CTAs |
| `or-clair` | `#E8CC7A` | Hover sur elements dorés |
| `anthracite` | `#1C1C1A` | Sections alternées sombres |
| `gris` | `#6B6B60` | Textes secondaires |
| `gris-clair` | `#E8E8E3` | Séparateurs, bordures |

### Typographie
- **Cormorant Garamond** — Titres (`font-display`) : élégance, charme gastronomique
- **DM Sans** — Corps (`font-body`) : lisibilité moderne et propre

### Classes utilitaires custom
```css
.section-label     /* Label or en majuscules, espacé — ex: "Notre Histoire" */
.display-title     /* Grand titre serif noir */
.btn-primary       /* Bouton doré plein */
.btn-outline       /* Bouton contour doré */
.btn-outline-white /* Bouton contour blanc (sur fond sombre) */
.card-hover        /* Élévation au survol */
.input-field       /* Champ de formulaire minimaliste, souligné */
.gold-line         /* Ligne dorée avec dégradé (transparent → or → transparent) */
.gold-line-solid   /* Ligne dorée pleine */
```

---

## 📄 Pages

### Accueil (`/`)
- Hero plein écran avec overlay et CTA
- Présentation du chef avec stats (2 étoiles, 15+ producteurs, 250 vins)
- 3 plats signatures en cartes avec hover
- 3 témoignages clients avec étoiles
- Bandeau horaires + réservation
- Galerie teaser 4 photos

### Menu (`/menu`)
- Hero sombre avec image de fond
- Onglets sticky (Entrées / Plats / Desserts / Vins) — 4 catégories, 20 plats
- Tags colorés : Signature, Végétarien, Premium, Mer, etc.
- 2 menus dégustation (Découverte 95€ / Prestige 165€)
- Note allergènes en bas de page

### Galerie (`/galerie`)
- Filtres par catégorie (Tous / Plats / Ambiance / Équipe / Événements)
- Grille masonry responsive (1 → 2 → 3 → 4 colonnes)
- Lightbox plein écran avec navigation précédent/suivant

### Réservation (`/reservation`)
- Formulaire complet : identité, date/heure/personnes, occasion, demandes
- Validation côté client avec messages d'erreur
- Sélecteur de date (dates passées désactivées)
- Groupes d'heures déjeuner/dîner
- Sidebar d'informations pratiques sticky
- Page de confirmation après envoi

### Contact (`/contact`)
- Coordonnées avec icônes
- Bouton "Ouvrir dans Maps" + lien Google Maps
- Horaires détaillés jour par jour
- Liens réseaux sociaux (Instagram, Facebook)
- Formulaire de contact avec validation
- Carte Google Maps intégrée (iframe)

---

## ✏️ Personnalisation

### Changer le contenu du menu
Éditez `data/menu.js` — chaque plat suit ce format :
```js
{
  id: 1,
  nom: 'Nom du plat',
  description: 'Description courte et appétissante',
  prix: '28',              // Sans le symbole €
  tags: ['signature'],     // 'signature' | 'végétarien' | 'premium' | 'mer'
}
```

### Ajouter des photos à la galerie
Éditez `data/gallery.js` :
```js
{
  id: 13,
  src: 'https://images.unsplash.com/photo-XXXXXXX?w=800&q=80',
  alt: 'Description de la photo',
  categorie: 'plats',      // 'plats' | 'ambiance' | 'equipe' | 'evenements'
  width: 800,
  height: 600,
}
```

### Remplacer les images Unsplash par vos propres photos
1. Placez vos images dans `public/images/`
2. Remplacez les URLs Unsplash par `/images/votre-photo.jpg`
3. Retirez le domaine `images.unsplash.com` de `next.config.js`

### Connecter un vrai backend de réservation
Dans `app/reservation/page.tsx`, remplacez la simulation dans `handleSubmit` :
```js
// Avant (simulation)
await new Promise((res) => setTimeout(res, 1400))

// Après (API réelle)
await fetch('/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

---

## 🔧 Déploiement

```bash
# Build de production
npm run build

# Tester le build
npm start
```

**Déploiement recommandé : Vercel**
```bash
npx vercel --prod
```

---

## 📱 Responsive
- Mobile : 375px+
- Tablet : 768px+
- Desktop : 1024px+
- Wide : 1280px+

Testé sur Chrome, Firefox, Safari, Edge.
