'use client';

import { Plus, FileBarChart, Settings } from 'lucide-react';

const actions = [
  {
    title: 'Adicionar Grupo',
    description: 'Conecte um novo grupo WhatsApp',
    icon: Plus,
    color: 'bg-accent/10 text-accent',
  },
  {
    title: 'Gerar Relatório',
    description: 'Exporte analytics em PDF',
    icon: FileBarChart,
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
  },
  {
    title: 'Configurar Bot',
    description: 'Personalize respostas e comportamento',
    icon: Settings,
    color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
  },
];

export default function ActionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action) => (
        <button
          key={action.title}
          className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all text-left group"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${action.color}`}>
            <action.icon size={20} />
          </div>
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-accent transition-colors">
            {action.title}
          </h4>
          <p className="text-xs text-gray-400 mt-1">{action.description}</p>
        </button>
      ))}
    </div>
  );
}
