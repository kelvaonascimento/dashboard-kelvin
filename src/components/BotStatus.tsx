'use client';

import { Bot, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BotStatusProps {
  online?: boolean;
  lastSeen?: string;
}

export default function BotStatus({ online = true, lastSeen }: BotStatusProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-gray-900 rounded-xl border p-5',
      online 
        ? 'border-green-200 dark:border-green-800' 
        : 'border-red-200 dark:border-red-800'
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          'p-2.5 rounded-lg',
          online ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
        )}>
          <Bot size={20} className={online ? 'text-green-600' : 'text-red-600'} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Clawd Bot</h3>
            <span className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
              online
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {online ? <Wifi size={10} /> : <WifiOff size={10} />}
              {online ? 'Online' : 'Offline'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {lastSeen || 'Funcionando normalmente'}
          </p>
        </div>
      </div>
    </div>
  );
}
