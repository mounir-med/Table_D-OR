import {
  CalendarCheck,
  UtensilsCrossed,
  Table2,
  Tag,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
} from 'lucide-react'

const stats = [
  { label: 'Réservations aujourd\'hui', value: '12', icon: CalendarCheck, trend: '+2 vs hier' },
  { label: 'Couverts ce mois', value: '847', icon: Users, trend: '+18%' },
  { label: 'Plats au menu', value: '20', icon: UtensilsCrossed, trend: null },
  { label: 'Tables actives', value: '14', icon: Table2, trend: null },
]

const recentReservations = [
  { nom: 'Sophie M.', date: 'Aujourd\'hui 19h30', couverts: 2, statut: 'confirmée' },
  { nom: 'Thomas B.', date: 'Aujourd\'hui 20h00', couverts: 4, statut: 'confirmée' },
  { nom: 'Marie-Claire D.', date: 'Aujourd\'hui 21h00', couverts: 6, statut: 'en attente' },
  { nom: 'Jean-Pierre L.', date: 'Demain 12h30', couverts: 2, statut: 'confirmée' },
  { nom: 'Isabelle R.', date: 'Demain 19h00', couverts: 3, statut: 'en attente' },
]

const quickLinks = [
  { label: 'Gérer les catégories', href: '/admin/categories', icon: Tag },
  { label: 'Gérer les tables', href: '/admin/tables', icon: Table2 },
  { label: 'Gérer le menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Voir les réservations', href: '/admin/reservations', icon: CalendarCheck },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-ivoire text-3xl font-light mb-1">Tableau de bord</h1>
        <p className="font-body text-gris text-sm">Lundi 22 juin 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, trend }) => (
          <div key={label} className="bg-noir border border-white/5 rounded p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 bg-or/10 rounded flex items-center justify-center">
                <Icon size={16} className="text-or" />
              </div>
              {trend && (
                <span className="flex items-center gap-1 font-body text-xs text-green-400">
                  <TrendingUp size={11} />
                  {trend}
                </span>
              )}
            </div>
            <div className="font-display text-ivoire text-3xl font-light mb-1">{value}</div>
            <div className="font-body text-gris text-xs">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Réservations récentes */}
        <div className="lg:col-span-2 bg-noir border border-white/5 rounded">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-body text-ivoire text-sm font-medium">Réservations du jour</h2>
            <a href="/admin/reservations" className="font-body text-or text-xs hover:text-or-clair transition-colors">
              Voir tout →
            </a>
          </div>
          <div className="divide-y divide-white/5">
            {recentReservations.map((r, i) => (
              <div key={i} className="px-6 py-3.5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-anthracite flex items-center justify-center shrink-0">
                  <span className="font-body text-gris text-xs">{r.nom[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-ivoire text-sm font-medium truncate">{r.nom}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="font-body text-gris text-xs flex items-center gap-1">
                      <Clock size={10} />
                      {r.date}
                    </span>
                    <span className="font-body text-gris text-xs">{r.couverts} pers.</span>
                  </div>
                </div>
                <span className={`font-body text-xs px-2 py-0.5 rounded-full shrink-0 ${
                  r.statut === 'confirmée'
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-or/10 text-or'
                }`}>
                  {r.statut}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accès rapides */}
        <div className="bg-noir border border-white/5 rounded">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="font-body text-ivoire text-sm font-medium">Accès rapides</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-3 rounded hover:bg-white/5 transition-colors group"
              >
                <div className="w-8 h-8 bg-or/10 rounded flex items-center justify-center">
                  <Icon size={14} className="text-or" />
                </div>
                <span className="font-body text-gris text-sm group-hover:text-ivoire transition-colors">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
