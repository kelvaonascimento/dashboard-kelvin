'use client';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CheckCircle2,
  MessageSquare,
  Bot,
  AlertTriangle,
  Palette,
  Mail,
  FileText,
  MonitorSmartphone,
  Instagram,
  LayoutDashboard,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';
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

const iconMap: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  carousel_generated: { icon: Palette, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  carousel_approved: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  carousel_revised: { icon: Wrench, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  clickup_check: { icon: ClipboardCheck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  email_check: { icon: Mail, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
  briefing: { icon: FileText, color: 'text-brand-orange', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  whatsapp_monitor: { icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
  alert_sent: { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
  instagram_action: { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  dashboard_created: { icon: LayoutDashboard, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
  bot_action: { icon: Bot, color: 'text-brand-orange', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  system: { icon: MonitorSmartphone, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-800' },
};

const defaultIcon = { icon: Bot, color: 'text-brand-orange', bg: 'bg-orange-100 dark:bg-orange-900/30' };

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export default function ActivityFeed({ activities, maxItems = 15 }: ActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Atividade Recente</h3>
        <span className="text-xs text-gray-400">{activities.length} registros</span>
      </div>
      <div className="space-y-1">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">Nenhuma atividade registrada</p>
        )}
        {items.map((item) => {
          const config = iconMap[item.type] || defaultIcon;
          const Icon = config.icon;
          const ts = item.timestamp || item.created_at;
          return (
            <div key={item.id} className="flex items-start gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className={cn('p-1.5 rounded-lg mt-0.5', config.bg)}>
                <Icon size={14} className={config.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {ts ? formatDistanceToNow(new Date(ts), { addSuffix: true, locale: ptBR }) : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
