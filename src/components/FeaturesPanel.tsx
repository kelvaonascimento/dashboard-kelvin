'use client';

import { cn } from '@/lib/utils';

interface Feature {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'restricted' | 'coming';
  detail: string;
  emoji: string;
  stat?: string;
}

const features: Feature[] = [
  {
    name: 'Monitoramento WhatsApp',
    description: 'Monitora grupos WhatsApp em tempo real via Evolution API',
    status: 'active',
    detail: '6 grupos',
    emoji: '💬',
    stat: '6 grupos ativos',
  },
  {
    name: 'Geração de Carrosséis',
    description: 'Cria carrosséis automaticamente com Gemini 2.5 Pro',
    status: 'active',
    detail: 'Gemini 2.5 Pro',
    emoji: '🎨',
    stat: 'Sob demanda',
  },
  {
    name: 'Check de Tarefas',
    description: 'Verifica tarefas pendentes no ClickUp CB e RPK',
    status: 'active',
    detail: '3x/dia',
    emoji: '✅',
    stat: '3x ao dia',
  },
  {
    name: 'Check de Emails',
    description: 'Verifica emails importantes no Gmail',
    status: 'active',
    detail: '2x/dia',
    emoji: '📧',
    stat: '2x ao dia',
  },
  {
    name: 'Briefing Matinal',
    description: 'Envia resumo da agenda e tarefas do dia',
    status: 'active',
    detail: '07:00',
    emoji: '☀️',
    stat: 'Todos os dias 07h',
  },
  {
    name: 'Resumo Noturno',
    description: 'Resumo das atividades e alertas do dia',
    status: 'active',
    detail: '20:00',
    emoji: '🌙',
    stat: 'Todos os dias 20h',
  },
  {
    name: 'Postagem Instagram',
    description: 'Publicação automática de conteúdo no Instagram',
    status: 'inactive',
    detail: 'IP bloqueado',
    emoji: '📸',
  },
  {
    name: 'Engajamento Instagram',
    description: 'Interações automáticas em perfis relevantes',
    status: 'restricted',
    detail: 'Restrito',
    emoji: '❤️',
  },
];

const statusMap = {
  active: { label: 'Ativo', dotColor: 'bg-green-500', textColor: 'text-green-700 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  inactive: { label: 'Desativado', dotColor: 'bg-red-500', textColor: 'text-red-700 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20' },
  restricted: { label: 'Restrito', dotColor: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
  coming: { label: 'Em breve', dotColor: 'bg-gray-400', textColor: 'text-gray-500', bgColor: 'bg-gray-50 dark:bg-gray-800' },
};

export default function FeaturesPanel() {
  const activeCount = features.filter(f => f.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Funcionalidades</h2>
          <p className="text-sm text-gray-500 mt-1">Ative e configure recursos do seu bot</p>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium">
          {activeCount} de {features.length} ativos
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => {
          const status = statusMap[feature.status];
          return (
            <div
              key={feature.name}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </div>
                {/* Toggle-style status */}
                <div className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold',
                  status.bgColor, status.textColor
                )}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', status.dotColor)} />
                  {status.label}
                </div>
              </div>
              {feature.stat && (
                <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800/50">
                  <span className="text-xs text-gray-400">{feature.stat}</span>
                </div>
              )}
              {!feature.stat && feature.detail && (
                <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800/50">
                  <span className="text-xs text-gray-400">{feature.detail}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
