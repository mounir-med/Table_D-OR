'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, Users } from 'lucide-react'

type Table = {
  id: number
  numero: number
  capacite: number
  emplacement: 'salle principale' | 'terrasse' | 'salon privé'
  statut: 'disponible' | 'occupée' | 'réservée' | 'hors service'
}

const initialTables: Table[] = [
  { id: 1, numero: 1, capacite: 2, emplacement: 'salle principale', statut: 'disponible' },
  { id: 2, numero: 2, capacite: 2, emplacement: 'salle principale', statut: 'réservée' },
  { id: 3, numero: 3, capacite: 4, emplacement: 'salle principale', statut: 'occupée' },
  { id: 4, numero: 4, capacite: 4, emplacement: 'salle principale', statut: 'disponible' },
  { id: 5, numero: 5, capacite: 6, emplacement: 'salle principale', statut: 'réservée' },
  { id: 6, numero: 6, capacite: 8, emplacement: 'salon privé', statut: 'disponible' },
  { id: 7, numero: 7, capacite: 2, emplacement: 'terrasse', statut: 'disponible' },
  { id: 8, numero: 8, capacite: 4, emplacement: 'terrasse', statut: 'hors service' },
]

const emplacements = ['salle principale', 'terrasse', 'salon privé'] as const
const statuts = ['disponible', 'occupée', 'réservée', 'hors service'] as const

type FormState = Omit<Table, 'id'>

const empty: FormState = { numero: 0, capacite: 2, emplacement: 'salle principale', statut: 'disponible' }

const statutStyle: Record<Table['statut'], string> = {
  disponible: 'bg-green-500/10 text-green-400',
  occupée: 'bg-red-500/10 text-red-400',
  réservée: 'bg-or/10 text-or',
  'hors service': 'bg-white/5 text-gris',
}

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Table | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [filterEmplacement, setFilterEmplacement] = useState<string>('tous')

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setShowModal(true)
  }

  function openEdit(table: Table) {
    setEditing(table)
    setForm({ numero: table.numero, capacite: table.capacite, emplacement: table.emplacement, statut: table.statut })
    setShowModal(true)
  }

  function handleSave() {
    if (!form.numero) return
    if (editing) {
      setTables((prev) => prev.map((t) => (t.id === editing.id ? { ...editing, ...form } : t)))
    } else {
      setTables((prev) => [...prev, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setTables((prev) => prev.filter((t) => t.id !== id))
    setDeleteId(null)
  }

  const filtered = filterEmplacement === 'tous' ? tables : tables.filter((t) => t.emplacement === filterEmplacement)

  const counts = {
    disponible: tables.filter((t) => t.statut === 'disponible').length,
    occupée: tables.filter((t) => t.statut === 'occupée').length,
    réservée: tables.filter((t) => t.statut === 'réservée').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-ivoire text-3xl font-light mb-1">Tables</h1>
          <p className="font-body text-gris text-sm">{tables.length} tables · {counts.disponible} disponibles</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <Plus size={16} /> Nouvelle table
        </button>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Disponibles', count: counts.disponible, cls: 'text-green-400' },
          { label: 'Réservées', count: counts.réservée, cls: 'text-or' },
          { label: 'Occupées', count: counts.occupée, cls: 'text-red-400' },
        ].map(({ label, count, cls }) => (
          <div key={label} className="bg-noir border border-white/5 rounded p-4 text-center">
            <div className={`font-display text-2xl font-light mb-1 ${cls}`}>{count}</div>
            <div className="font-body text-gris text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['tous', ...emplacements].map((e) => (
          <button
            key={e}
            onClick={() => setFilterEmplacement(e)}
            className={`font-body text-xs px-3 py-1.5 rounded border transition-colors capitalize ${
              filterEmplacement === e
                ? 'bg-or text-noir border-or'
                : 'border-white/10 text-gris hover:text-ivoire hover:border-white/20'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((table) => (
          <div key={table.id} className="bg-noir border border-white/5 rounded p-5 group hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-display text-ivoire text-2xl font-light">T{table.numero}</div>
                <div className="font-body text-gris text-xs capitalize mt-0.5">{table.emplacement}</div>
              </div>
              <span className={`font-body text-xs px-2 py-0.5 rounded-full ${statutStyle[table.statut]}`}>
                {table.statut}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Users size={13} className="text-gris" />
              <span className="font-body text-gris text-sm">{table.capacite} personnes</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(table)} className="admin-icon-btn flex-1 justify-center">
                <Pencil size={13} />
              </button>
              <button onClick={() => setDeleteId(table.id)} className="admin-icon-btn flex-1 justify-center text-red-400 hover:bg-red-400/10">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-ivoire text-xl font-light">
                {editing ? `Modifier table T${editing.numero}` : 'Nouvelle table'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gris hover:text-ivoire">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Numéro *</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={form.numero || ''}
                    onChange={(e) => setForm({ ...form, numero: Number(e.target.value) })}
                    min={1}
                  />
                </div>
                <div>
                  <label className="admin-label">Capacité *</label>
                  <input
                    type="number"
                    className="admin-input"
                    value={form.capacite}
                    onChange={(e) => setForm({ ...form, capacite: Number(e.target.value) })}
                    min={1}
                    max={20}
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Emplacement</label>
                <select
                  className="admin-input"
                  value={form.emplacement}
                  onChange={(e) => setForm({ ...form, emplacement: e.target.value as Table['emplacement'] })}
                >
                  {emplacements.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">Statut</label>
                <select
                  className="admin-input"
                  value={form.statut}
                  onChange={(e) => setForm({ ...form, statut: e.target.value as Table['statut'] })}
                >
                  {statuts.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
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
            <h2 className="font-display text-ivoire text-xl font-light">Confirmer la suppression</h2>
            <p className="font-body text-gris text-sm">Voulez-vous supprimer cette table ?</p>
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
