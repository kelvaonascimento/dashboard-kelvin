'use client';

import { MessageSquare, Users, Wifi, WifiOff, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Group {
  name: string;
  emoji: string;
  initials: string;
  type: 'whatsapp';
  status: 'active' | 'paused';
  messagesDaily: number;
  participants: number;
  transcriptions: number;
  uptime: string;
}

const groups: Group[] = [
  {
    name: 'Agência RPK X GPC Empreendimentos',
    emoji: '📱',
    initials: 'GPC',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 45,
    participants: 12,
    transcriptions: 3,
    uptime: '99%',
  },
  {
    name: 'Wind Incorporadora + Agência RPK',
    emoji: '📱',
    initials: 'WI',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 30,
    participants: 8,
    transcriptions: 2,
    uptime: '98%',
  },
  {
    name: 'MBIGUCCI MUNDI - 2ª FASE',
    emoji: '📱',
    initials: 'MB',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 60,
    participants: 15,
    transcriptions: 5,
    uptime: '99%',
  },
  {
    name: 'Campanha SEMPRE VIVAS - EXKALLA',
    emoji: '📱',
    initials: 'EX',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 25,
    participants: 10,
    transcriptions: 1,
    uptime: '97%',
  },
  {
    name: 'CB Executivos de Vendas',
    emoji: '📱',
    initials: 'CE',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 20,
    participants: 6,
    transcriptions: 2,
    uptime: '99%',
  },
  {
    name: 'CB Team Marketing',
    emoji: '📱',
    initials: 'CM',
    type: 'whatsapp',
    status: 'active',
    messagesDaily: 35,
    participants: 9,
    transcriptions: 4,
    uptime: '98%',
  },
];

export default function GroupsPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Grupos & Canais</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie todos os seus grupos conectados</p>
      </div>

      {/* Group cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.name}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent text-sm font-bold">
                  {group.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">{group.name}</h3>
                  <span className="text-xs text-gray-400">WhatsApp</span>
                </div>
              </div>
              <span className={cn(
                'text-[11px] font-semibold px-2 py-0.5 rounded-full',
                group.status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400'
              )}>
                {group.status === 'active' ? 'Ativo' : 'Pausado'}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              {group.status === 'active'
                ? `${group.messagesDaily} mensagens hoje • ${group.participants} participantes`
                : `Bot pausado • ${group.participants} participantes`}
            </p>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-50 dark:border-gray-800/50">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{group.status === 'active' ? group.messagesDaily : '-'}</p>
                <p className="text-[11px] text-gray-400">Mensagens</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{group.status === 'active' ? group.transcriptions : '-'}</p>
                <p className="text-[11px] text-gray-400">Transcrições</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{group.status === 'active' ? group.uptime : '-'}</p>
                <p className="text-[11px] text-gray-400">Uptime</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
