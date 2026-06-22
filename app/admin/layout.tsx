'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Tag,
  Table2,
  UtensilsCrossed,
  CalendarCheck,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/categories', label: 'Catégories', icon: Tag },
  { href: '/admin/tables', label: 'Tables', icon: Table2 },
  { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/admin/reservations', label: 'Réservations', icon: CalendarCheck },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#0F0F0D] flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-noir/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 w-64 bg-noir border-r border-white/5 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-display text-ivoire text-lg font-light leading-none">La Table</span>
            <span className="font-display text-or text-xl font-semibold leading-none" style={{ letterSpacing: '0.08em' }}>d'Or</span>
          </Link>
          <span className="ml-auto text-gris text-xs font-body tracking-widest uppercase">Admin</span>
          <button
            className="lg:hidden ml-3 text-gris hover:text-ivoire"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body font-medium transition-all duration-200 group
                  ${isActive
                    ? 'bg-or/10 text-or'
                    : 'text-gris hover:text-ivoire hover:bg-white/5'
                  }`}
              >
                <Icon size={16} className={isActive ? 'text-or' : 'text-gris group-hover:text-ivoire'} />
                {label}
                {isActive && <ChevronRight size={14} className="ml-auto text-or" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-gris hover:text-ivoire text-sm font-body transition-colors"
          >
            <LogOut size={16} />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-noir border-b border-white/5 flex items-center px-6 gap-4 sticky top-0 z-10">
          <button
            className="lg:hidden text-gris hover:text-ivoire"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="h-4 w-px bg-white/10 lg:hidden" />
          <span className="font-body text-gris text-sm">
            {navItems.find((n) => n.href === pathname)?.label ?? 'Admin'}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-or/20 flex items-center justify-center">
              <span className="font-body text-or text-xs font-medium">A</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
