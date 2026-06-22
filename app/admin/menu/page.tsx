'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, Tag } from 'lucide-react'
import { menuData, categories as menuCategories } from '@/data/menu'

type Plat = {
  id: number
  nom: string
  description: string
  prix: string
  tags: string[]
  categorie: string
}

function buildInitial(): Plat[] {
  const items: Plat[] = []
  for (const [cat, plats] of Object.entries(menuData)) {
    for (const p of plats as any[]) {
      items.push({ ...p, categorie: cat })
    }
  }
  return items
}

const allTags = ['signature', 'mer', 'premium', 'végétarien', 'blanc', 'rouge', 'champagne']

type FormState = Omit<Plat, 'id'>

const empty: FormState = { nom: '', description: '', prix: '', tags: [], categorie: 'entrees' }

export default function AdminMenuPage() {
  const [plats, setPlats] = useState<Plat[]>(buildInitial)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Plat | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [activeCat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setShowModal(true)
  }

  function openEdit(plat: Plat) {
    setEditing(plat)
    setForm({ nom: plat.nom, description: plat.description, prix: plat.prix, tags: plat.tags, categorie: plat.categorie })
    setShowModal(true)
  }

  function handleSave() {
    if (!form.nom.trim() || !form.prix.trim()) return
    if (editing) {
      setPlats((prev) => prev.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)))
    } else {
      setPlats((prev) => [...prev, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setPlats((prev) => prev.filter((p) => p.id !== id))
    setDeleteId(null)
  }

  function toggleTag(tag: string) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }))
  }

  const filtered = plats.filter((p) => {
    const matchCat = activeCat === 'all' || p.categorie === activeCat
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-ivoire text-3xl font-light mb-1">Menu</h1>
          <p className="font-body text-gris text-sm">{plats.length} plats au total</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <Plus size={16} /> Nouveau plat
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="admin-input max-w-xs"
          placeholder="Rechercher un plat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCat('all')}
            className={`font-body text-xs px-3 py-1.5 rounded border transition-colors ${
              activeCat === 'all' ? 'bg-or text-noir border-or' : 'border-white/10 text-gris hover:text-ivoire'
            }`}
          >
            Tous ({plats.length})
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`font-body text-xs px-3 py-1.5 rounded border transition-colors ${
                activeCat === cat.id ? 'bg-or text-noir border-or' : 'border-white/10 text-gris hover:text-ivoire'
              }`}
            >
              {cat.emoji} {cat.label} ({plats.filter((p) => p.categorie === cat.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-noir border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="admin-th">Plat</th>
              <th className="admin-th hidden lg:table-cell">Catégorie</th>
              <th className="admin-th hidden md:table-cell">Tags</th>
              <th className="admin-th">Prix</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((plat) => (
              <tr key={plat.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="admin-td">
                  <div>
                    <div className="font-body text-ivoire text-sm font-medium">{plat.nom}</div>
                    <div className="font-body text-gris text-xs mt-0.5 line-clamp-1 hidden sm:block">{plat.description}</div>
                  </div>
                </td>
                <td className="admin-td hidden lg:table-cell">
                  <span className="font-body text-gris text-xs capitalize">
                    {menuCategories.find((c) => c.id === plat.categorie)?.label ?? plat.categorie}
                  </span>
                </td>
                <td className="admin-td hidden md:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {plat.tags.map((tag) => (
                      <span key={tag} className="font-body text-xs bg-or/10 text-or px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="admin-td">
                  <span className="font-body text-ivoire text-sm font-medium">{plat.prix}€</span>
                </td>
                <td className="admin-td">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(plat)} className="admin-icon-btn" aria-label="Modifier">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteId(plat.id)} className="admin-icon-btn text-red-400 hover:bg-red-400/10" aria-label="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center font-body text-gris text-sm">Aucun plat trouvé</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-ivoire text-xl font-light">
                {editing ? 'Modifier le plat' : 'Nouveau plat'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gris hover:text-ivoire">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="admin-label">Nom *</label>
                <input className="admin-input" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom du plat" />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-input resize-none"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description du plat..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Prix (€) *</label>
                  <input type="number" className="admin-input" value={form.prix} onChange={(e) => setForm({ ...form, prix: e.target.value })} min={0} />
                </div>
                <div>
                  <label className="admin-label">Catégorie</label>
                  <select className="admin-input" value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })}>
                    {menuCategories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Tags</label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`font-body text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        form.tags.includes(tag)
                          ? 'bg-or/20 text-or border-or/40'
                          : 'border-white/10 text-gris hover:text-ivoire'
                      }`}
                    >
                      <Tag size={10} className="inline mr-1" />{tag}
                    </button>
                  ))}
                </div>
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
            <h2 className="font-display text-ivoire text-xl font-light">Supprimer ce plat ?</h2>
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
