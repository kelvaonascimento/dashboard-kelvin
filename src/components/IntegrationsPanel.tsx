'use client';

import { CheckCircle2, XCircle, PauseCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Integration {
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'paused';
  icon: string;
  uptime?: string;
}

const connected: Integration[] = [
  { name: 'ClickUp CB', description: 'Workspace Cultura Builder sincronizado', icon: '📋', status: 'connected', uptime: '99%' },
  { name: 'ClickUp RPK', description: 'Workspace RPK sincronizado', icon: '📋', status: 'connected', uptime: '99%' },
  { name: 'WhatsApp Pessoal', description: 'Conta pessoal via Evolution API', icon: '💬', status: 'connected', uptime: '98%' },
  { name: 'WhatsApp Business', description: 'Conta business via Evolution API', icon: '💼', status: 'connected', uptime: '99%' },
  { name: 'Telegram', description: 'Clawdbot conectado e ativo', icon: '✈️', status: 'connected', uptime: '99.9%' },
  { name: 'Google Calendar', description: 'Sincronize eventos e crie reuniões', icon: '📅', status: 'connected', uptime: '99.9%' },
  { name: 'Google Gmail', description: 'Check de emails 2x ao dia', icon: '📧', status: 'connected', uptime: '99%' },
  { name: 'GitHub', description: 'Repositório clawd conectado', icon: '🐙', status: 'connected', uptime: '99.9%' },
  { name: 'Vercel', description: 'Dashboard deployado automaticamente', icon: '▲', status: 'connected', uptime: '99.9%' },
  { name: 'Figma', description: 'Design assets e protótipos', icon: '🎨', status: 'connected', uptime: '99%' },
  { name: 'HeyGen', description: 'Geração de vídeos com avatares IA', icon: '🎬', status: 'connected', uptime: '95%' },
  { name: 'ElevenLabs', description: 'Text-to-speech e clonagem de voz', icon: '🔊', status: 'connected', uptime: '98%' },
  { name: 'Gemini AI', description: 'Processamento de linguagem e análise', icon: '🤖', status: 'connected', uptime: '99%' },
];

const disconnected: Integration[] = [
  { name: 'Instagram RPK', description: 'IP bloqueado — necessário reconectar', icon: '📸', status: 'disconnected' },
  { name: 'Instagram CB', description: 'Conta não conectada', icon: '📸', status: 'disconnected' },
  { name: 'Meta Ads', description: 'API não configurada', icon: '📊', status: 'disconnected' },
  { name: 'Discord', description: 'Temporariamente pausado', icon: '🎮', status: 'paused' },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'connected') return <CheckCircle2 size={16} className="text-green-500" />;
  if (status === 'paused') return <PauseCircle size={16} className="text-yellow-500" />;
  return <XCircle size={16} className="text-red-500" />;
};

const statusLabel = (s: string) => {
  if (s === 'connected') return { text: 'Conectado', color: 'text-green-600 dark:text-green-400' };
  if (s === 'paused') return { text: 'Pausado', color: 'text-yellow-600 dark:text-yellow-400' };
  return { text: 'Desconectado', color: 'text-red-600 dark:text-red-400' };
};

export default function IntegrationsPanel() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Integrações</h2>
          <p className="text-sm text-gray-500 mt-1">Conecte seu bot com suas ferramentas favoritas</p>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium">
          {connected.length} conectadas
        </span>
      </div>

      {/* Connected */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Conectadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {connected.map((item) => {
            const sl = statusLabel(item.status);
            return (
              <div
                key={item.name}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <span className="text-[11px] font-medium text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                        Conectado
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.description}</p>
                  </div>
                </div>
                {item.uptime && (
                  <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-800/50">
                    <span className="text-[11px] text-gray-400">{item.uptime} uptime</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Disconnected */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Disponíveis / Desconectadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {disconnected.map((item) => {
            const sl = statusLabel(item.status);
            return (
              <div
                key={item.name}
                className={cn(
                  'bg-white dark:bg-gray-900 rounded-xl border p-4 shadow-sm opacity-75 hover:opacity-100 transition-all',
                  item.status === 'paused'
                    ? 'border-yellow-200 dark:border-yellow-800/50'
                    : 'border-red-200 dark:border-red-800/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl grayscale">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <span className={cn(
                        'text-[11px] font-medium px-1.5 py-0.5 rounded-full',
                        item.status === 'paused'
                          ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400'
                      )}>
                        {sl.text}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
