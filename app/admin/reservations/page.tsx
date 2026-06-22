'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, Clock, Users, Phone, Mail } from 'lucide-react'

type Reservation = {
  id: number
  nom: string
  email: string
  telephone: string
  date: string
  heure: string
  couverts: number
  table: number | null
  statut: 'confirmée' | 'en attente' | 'annulée' | 'terminée'
  notes: string
}

const initialReservations: Reservation[] = [
  { id: 1, nom: 'Sophie M.', email: 'sophie@example.com', telephone: '+33 6 12 34 56 78', date: '2026-06-22', heure: '19:30', couverts: 2, table: 1, statut: 'confirmée', notes: '' },
  { id: 2, nom: 'Thomas B.', email: 'thomas@example.com', telephone: '+33 6 98 76 54 32', date: '2026-06-22', heure: '20:00', couverts: 4, table: 3, statut: 'confirmée', notes: 'Anniversaire' },
  { id: 3, nom: 'Marie-Claire D.', email: 'mc@example.com', telephone: '+33 6 11 22 33 44', date: '2026-06-22', heure: '21:00', couverts: 6, table: 5, statut: 'en attente', notes: '' },
  { id: 4, nom: 'Jean-Pierre L.', email: 'jp@example.com', telephone: '+33 6 55 66 77 88', date: '2026-06-23', heure: '12:30', couverts: 2, table: 2, statut: 'confirmée', notes: 'Table terrasse si possible' },
  { id: 5, nom: 'Isabelle R.', email: 'isa@example.com', telephone: '+33 6 44 33 22 11', date: '2026-06-23', heure: '19:00', couverts: 3, table: null, statut: 'en attente', notes: '' },
  { id: 6, nom: 'Michel F.', email: 'michel@example.com', telephone: '+33 6 77 88 99 00', date: '2026-06-21', heure: '20:30', couverts: 2, table: 4, statut: 'terminée', notes: '' },
  { id: 7, nom: 'Lucie G.', email: 'lucie@example.com', telephone: '+33 6 12 11 10 09', date: '2026-06-20', heure: '19:00', couverts: 4, table: 6, statut: 'annulée', notes: 'Annulée par le client' },
]

const statutStyle: Record<Reservation['statut'], string> = {
  confirmée: 'bg-green-500/10 text-green-400',
  'en attente': 'bg-or/10 text-or',
  annulée: 'bg-red-500/10 text-red-400',
  terminée: 'bg-white/5 text-gris',
}

type FormState = Omit<Reservation, 'id'>

const empty: FormState = {
  nom: '', email: '', telephone: '', date: '', heure: '19:30',
  couverts: 2, table: null, statut: 'en attente', notes: '',
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Reservation | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [filterStatut, setFilterStatut] = useState<string>('tous')
  const [search, setSearch] = useState('')

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setShowModal(true)
  }

  function openEdit(r: Reservation) {
    setEditing(r)
    setForm({ nom: r.nom, email: r.email, telephone: r.telephone, date: r.date, heure: r.heure, couverts: r.couverts, table: r.table, statut: r.statut, notes: r.notes })
    setShowModal(true)
  }

  function handleSave() {
    if (!form.nom.trim() || !form.date) return
    if (editing) {
      setReservations((prev) => prev.map((r) => (r.id === editing.id ? { ...editing, ...form } : r)))
    } else {
      setReservations((prev) => [...prev, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setReservations((prev) => prev.filter((r) => r.id !== id))
    setDeleteId(null)
  }

  const filtered = reservations.filter((r) => {
    const matchStatut = filterStatut === 'tous' || r.statut === filterStatut
    const matchSearch = r.nom.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
    return matchStatut && matchSearch
  })

  const counts = {
    confirmée: reservations.filter((r) => r.statut === 'confirmée').length,
    'en attente': reservations.filter((r) => r.statut === 'en attente').length,
    annulée: reservations.filter((r) => r.statut === 'annulée').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-ivoire text-3xl font-light mb-1">Réservations</h1>
          <p className="font-body text-gris text-sm">{reservations.length} réservations au total</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <Plus size={16} /> Nouvelle réservation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Confirmées', count: counts['confirmée'], cls: 'text-green-400' },
          { label: 'En attente', count: counts['en attente'], cls: 'text-or' },
          { label: 'Annulées', count: counts['annulée'], cls: 'text-red-400' },
        ].map(({ label, count, cls }) => (
          <div key={label} className="bg-noir border border-white/5 rounded p-4 text-center">
            <div className={`font-display text-2xl font-light mb-1 ${cls}`}>{count}</div>
            <div className="font-body text-gris text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="admin-input max-w-xs"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {['tous', 'confirmée', 'en attente', 'annulée', 'terminée'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatut(s)}
              className={`font-body text-xs px-3 py-1.5 rounded border transition-colors capitalize ${
                filterStatut === s ? 'bg-or text-noir border-or' : 'border-white/10 text-gris hover:text-ivoire'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-noir border border-white/5 rounded overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/5">
              <th className="admin-th">Client</th>
              <th className="admin-th">Date & Heure</th>
              <th className="admin-th">Couverts</th>
              <th className="admin-th hidden md:table-cell">Table</th>
              <th className="admin-th">Statut</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="admin-td">
                  <div>
                    <div className="font-body text-ivoire text-sm font-medium">{r.nom}</div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="font-body text-gris text-xs hidden sm:flex items-center gap-1">
                        <Mail size={9} /> {r.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="admin-td">
                  <div className="font-body text-ivoire text-sm">{r.date}</div>
                  <div className="font-body text-gris text-xs flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {r.heure}
                  </div>
                </td>
                <td className="admin-td">
                  <span className="font-body text-ivoire text-sm flex items-center gap-1.5">
                    <Users size={12} className="text-gris" /> {r.couverts}
                  </span>
                </td>
                <td className="admin-td hidden md:table-cell">
                  <span className="font-body text-gris text-sm">{r.table ? `T${r.table}` : '—'}</span>
                </td>
                <td className="admin-td">
                  <span className={`admin-badge ${statutStyle[r.statut]}`}>{r.statut}</span>
                </td>
                <td className="admin-td">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(r)} className="admin-icon-btn" aria-label="Modifier">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteId(r.id)} className="admin-icon-btn text-red-400 hover:bg-red-400/10" aria-label="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center font-body text-gris text-sm">Aucune réservation trouvée</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-ivoire text-xl font-light">
                {editing ? 'Modifier la réservation' : 'Nouvelle réservation'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gris hover:text-ivoire">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="admin-label">Nom *</label>
                  <input className="admin-input" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="admin-label">Téléphone</label>
                  <input className="admin-input" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="admin-label">Email</label>
                <input type="email" className="admin-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Date *</label>
                  <input type="date" className="admin-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Heure</label>
                  <input type="time" className="admin-input" value={form.heure} onChange={(e) => setForm({ ...form, heure: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Couverts</label>
                  <input type="number" className="admin-input" min={1} max={20} value={form.couverts} onChange={(e) => setForm({ ...form, couverts: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="admin-label">N° Table</label>
                  <input type="number" className="admin-input" min={1} value={form.table ?? ''} onChange={(e) => setForm({ ...form, table: e.target.value ? Number(e.target.value) : null })} placeholder="—" />
                </div>
              </div>
              <div>
                <label className="admin-label">Statut</label>
                <select className="admin-input" value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value as Reservation['statut'] })}>
                  {(['confirmée', 'en attente', 'annulée', 'terminée'] as const).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Notes</label>
                <textarea className="admin-input resize-none" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Demandes spéciales, allergies..." />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="admin-btn-ghost flex-1">Annuler</button>
              <button onClick={handleSave} className="admin-btn-primary flex-1 justify-center">
                <Check size={15} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-sm p-6 space-y-4">
            <h2 className="font-display text-ivoire text-xl font-light">Supprimer cette réservation ?</h2>
            <p className="font-body text-gris text-sm">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="admin-btn-ghost flex-1">Annuler</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-body text-sm px-4 py-2.5 rounded transition-colors">
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
