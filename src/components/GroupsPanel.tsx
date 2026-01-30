'use client';

import { MessageSquare, Users, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Group {
  name: string;
  type: 'whatsapp' | 'telegram';
  status: 'active' | 'inactive';
  members?: number;
  messagesDaily?: number;
}

const groups: Group[] = [
  { name: 'GPC', type: 'whatsapp', status: 'active', members: 12, messagesDaily: 45 },
  { name: 'Wind', type: 'whatsapp', status: 'active', members: 8, messagesDaily: 30 },
  { name: 'MBigucci', type: 'whatsapp', status: 'active', members: 15, messagesDaily: 60 },
  { name: 'Exkalla', type: 'whatsapp', status: 'active', members: 10, messagesDaily: 25 },
  { name: 'CB Executivos', type: 'whatsapp', status: 'active', members: 6, messagesDaily: 20 },
  { name: 'CB Marketing', type: 'whatsapp', status: 'active', members: 9, messagesDaily: 35 },
];

export default function GroupsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.name}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  'p-2 rounded-lg',
                  group.type === 'whatsapp' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                )}>
                  <MessageSquare size={16} className={group.type === 'whatsapp' ? 'text-green-600' : 'text-blue-500'} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{group.name}</h3>
                  <span className="text-xs text-gray-400 capitalize">{group.type}</span>
                </div>
              </div>
              <span className={cn(
                'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                group.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              )}>
                {group.status === 'active' ? <Wifi size={10} /> : <WifiOff size={10} />}
                {group.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users size={12} />
                {group.members} membros
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={12} />
                ~{group.messagesDaily} msg/dia
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
