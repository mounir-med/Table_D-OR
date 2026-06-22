'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

type Categorie = {
  id: number
  nom: string
  description: string
  couleur: string
  actif: boolean
}

const initialCategories: Categorie[] = [
  { id: 1, nom: 'Entrées', description: 'Amuse-bouches et entrées de saison', couleur: '#C9A84C', actif: true },
  { id: 2, nom: 'Plats', description: 'Plats principaux élaborés par le chef', couleur: '#6B6B60', actif: true },
  { id: 3, nom: 'Desserts', description: 'Créations sucrées et desserts signature', couleur: '#C9A84C', actif: true },
  { id: 4, nom: 'Vins & Champagnes', description: 'Sélection de la cave', couleur: '#8B2635', actif: true },
  { id: 5, nom: 'Menus Dégustation', description: 'Formules complètes', couleur: '#2E8B57', actif: false },
]

type FormState = Omit<Categorie, 'id'>

const empty: FormState = { nom: '', description: '', couleur: '#C9A84C', actif: true }

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>(initialCategories)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Categorie | null>(null)
  const [form, setForm] = useState<FormState>(empty)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  function openCreate() {
    setEditing(null)
    setForm(empty)
    setShowModal(true)
  }

  function openEdit(cat: Categorie) {
    setEditing(cat)
    setForm({ nom: cat.nom, description: cat.description, couleur: cat.couleur, actif: cat.actif })
    setShowModal(true)
  }

  function handleSave() {
    if (!form.nom.trim()) return
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...editing, ...form } : c)))
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), ...form }])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-ivoire text-3xl font-light mb-1">Catégories</h1>
          <p className="font-body text-gris text-sm">{categories.length} catégories au total</p>
        </div>
        <button onClick={openCreate} className="admin-btn-primary">
          <Plus size={16} /> Nouvelle catégorie
        </button>
      </div>

      {/* Table */}
      <div className="bg-noir border border-white/5 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="admin-th">Nom</th>
              <th className="admin-th hidden md:table-cell">Description</th>
              <th className="admin-th">Statut</th>
              <th className="admin-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="admin-td">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.couleur }} />
                    <span className="font-body text-ivoire text-sm font-medium">{cat.nom}</span>
                  </div>
                </td>
                <td className="admin-td hidden md:table-cell">
                  <span className="font-body text-gris text-sm">{cat.description}</span>
                </td>
                <td className="admin-td">
                  <span className={`admin-badge ${cat.actif ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                    {cat.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="admin-td">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(cat)} className="admin-icon-btn" aria-label="Modifier">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteId(cat.id)} className="admin-icon-btn text-red-400 hover:bg-red-400/10" aria-label="Supprimer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Création/Édition */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-ivoire text-xl font-light">
                {editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gris hover:text-ivoire">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="admin-label">Nom *</label>
                <input
                  className="admin-input"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  placeholder="Ex: Entrées"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <input
                  className="admin-input"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brève description"
                />
              </div>
              <div>
                <label className="admin-label">Couleur</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-10 h-10 rounded cursor-pointer border border-white/10 bg-transparent"
                    value={form.couleur}
                    onChange={(e) => setForm({ ...form, couleur: e.target.value })}
                  />
                  <span className="font-body text-gris text-sm">{form.couleur}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, actif: !form.actif })}
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${form.actif ? 'bg-or' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${form.actif ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                <label className="font-body text-gris text-sm">Catégorie active</label>
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

      {/* Modal Confirmation suppression */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-noir/80 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#141412] border border-white/10 rounded w-full max-w-sm p-6 space-y-4">
            <h2 className="font-display text-ivoire text-xl font-light">Confirmer la suppression</h2>
            <p className="font-body text-gris text-sm">Cette action est irréversible. Voulez-vous supprimer cette catégorie ?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="admin-btn-ghost flex-1">Annuler</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-body text-sm font-medium px-4 py-2.5 rounded transition-colors">
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
