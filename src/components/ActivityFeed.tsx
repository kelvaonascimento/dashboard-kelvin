'use client';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: number;
  created_at?: string;
  timestamp?: string;
  type: string;
  source: string;
  title: string;
  description?: string;
  metadata?: any;
}

const typeBadge: Record<string, { label: string; color: string; bg: string }> = {
  carousel_generated: { label: 'Carrossel', color: 'text-purple-700', bg: 'bg-purple-100 dark:bg-purple-900/40' },
  carousel_approved: { label: 'Aprovado', color: 'text-green-700', bg: 'bg-green-100 dark:bg-green-900/40' },
  carousel_revised: { label: 'Revisão', color: 'text-yellow-700', bg: 'bg-yellow-100 dark:bg-yellow-900/40' },
  clickup_check: { label: 'ClickUp', color: 'text-blue-700', bg: 'bg-blue-100 dark:bg-blue-900/40' },
  email_check: { label: 'Email', color: 'text-cyan-700', bg: 'bg-cyan-100 dark:bg-cyan-900/40' },
  briefing: { label: 'Briefing', color: 'text-orange-700', bg: 'bg-orange-100 dark:bg-orange-900/40' },
  whatsapp_monitor: { label: 'WhatsApp', color: 'text-green-700', bg: 'bg-green-100 dark:bg-green-900/40' },
  alert_sent: { label: 'Alerta', color: 'text-red-700', bg: 'bg-red-100 dark:bg-red-900/40' },
  instagram_action: { label: 'Instagram', color: 'text-pink-700', bg: 'bg-pink-100 dark:bg-pink-900/40' },
  dashboard_created: { label: 'Dashboard', color: 'text-indigo-700', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
  bot_action: { label: 'Bot', color: 'text-violet-700', bg: 'bg-violet-100 dark:bg-violet-900/40' },
  system: { label: 'Sistema', color: 'text-gray-700', bg: 'bg-gray-100 dark:bg-gray-800' },
};

const defaultBadge = { label: 'Ação', color: 'text-gray-700', bg: 'bg-gray-100 dark:bg-gray-800' };

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export default function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Atividade Recente</h3>
        <span className="text-xs text-gray-400">{activities.length} registros</span>
      </div>
      <div className="space-y-0">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">Nenhuma atividade registrada</p>
        )}
        {items.map((item) => {
          const badge = typeBadge[item.type] || defaultBadge;
          const ts = item.timestamp || item.created_at;
          return (
            <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
              <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap', badge.bg, badge.color)}>
                {badge.label}
              </span>
              <p className="text-[13px] text-gray-700 dark:text-gray-300 truncate flex-1">{item.title}</p>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">
                {ts ? formatDistanceToNow(new Date(ts), { addSuffix: true, locale: ptBR }) : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
