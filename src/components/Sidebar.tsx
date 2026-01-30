'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Activity,
  Radio,
  Plug,
  Settings,
  Menu,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'activity', label: 'Atividade', icon: Activity },
  { id: 'groups', label: 'Grupos & Canais', icon: Radio },
  { id: 'integrations', label: 'Integrações', icon: Plug },
  { id: 'settings', label: 'Configurações', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-all duration-300 flex flex-col',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-sm">Kelvin Dashboard</h1>
              <p className="text-xs text-gray-500">Bot Activity Center</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === item.id
                  ? 'bg-brand-orange/10 text-brand-orange'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse toggle (desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center p-3 border-t border-gray-200 dark:border-gray-800 text-gray-400 hover:text-gray-600"
        >
          <Menu size={18} />
        </button>
      </aside>
    </>
  );
}
