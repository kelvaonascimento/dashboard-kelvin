'use client';

import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CheckCircle2,
  MessageSquare,
  Instagram,
  Bot,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: number;
  timestamp: string;
  type: string;
  source: string;
  title: string;
  description?: string;
}

const iconMap: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  task_check: { icon: CheckCircle2, color: 'text-green-500' },
  message_sent: { icon: MessageSquare, color: 'text-blue-500' },
  post_created: { icon: Instagram, color: 'text-pink-500' },
  bot_action: { icon: Bot, color: 'text-brand-orange' },
  calendar_event: { icon: Calendar, color: 'text-purple-500' },
  alert: { icon: AlertTriangle, color: 'text-yellow-500' },
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export default function ActivityFeed({ activities, maxItems = 10 }: ActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="font-semibold text-sm mb-4">Atividade Recente</h3>
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">Nenhuma atividade registrada</p>
        )}
        {items.map((item) => {
          const iconConfig = iconMap[item.type] || iconMap.bot_action;
          const Icon = iconConfig.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className={cn('mt-0.5', iconConfig.color)}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 truncate">{item.description}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: ptBR })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
