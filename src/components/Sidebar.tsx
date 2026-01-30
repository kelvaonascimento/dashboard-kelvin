'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Radio,
  Puzzle,
  Plug,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  User,
} from 'lucide-react';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'groups', label: 'Grupos & Canais', icon: Radio, badge: 6 },
  { id: 'features', label: 'Funcionalidades', icon: Puzzle },
  { id: 'integrations', label: 'Integrações', icon: Plug, badge: 13 },
];

const settingsItems = [
  { id: 'config', label: 'Config', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Sidebar({ activeTab, onTabChange, darkMode, onToggleDark }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 flex flex-col',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-900 dark:text-white">Kelvão Bot</h1>
            <p className="text-[11px] text-gray-400">Bot-as-a-Service</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-3 mt-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Menu</p>
          <nav className="space-y-0.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all',
                  activeTab === item.id
                    ? 'bg-accent/10 text-accent dark:bg-accent/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-accent' : ''} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    'text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center',
                    activeTab === item.id
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Configurações</p>
          <nav className="space-y-0.5">
            {settingsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all',
                  activeTab === item.id
                    ? 'bg-accent/10 text-accent dark:bg-accent/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <item.icon size={18} className={activeTab === item.id ? 'text-accent' : ''} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom: Dark mode + User */}
        <div className="px-3 pb-4 space-y-3">
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-400">
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              <span>Modo escuro</span>
            </div>
            <button
              onClick={onToggleDark}
              className={cn(
                'relative w-10 h-5 rounded-full transition-colors',
                darkMode ? 'bg-accent' : 'bg-gray-300'
              )}
            >
              <span className={cn(
                'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm',
                darkMode ? 'translate-x-5' : 'translate-x-0.5'
              )} />
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-default">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <User size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-gray-900 dark:text-white">Kelvin Nascimento</p>
              <p className="text-[11px] text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
