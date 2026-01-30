'use client';

import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Integration {
  name: string;
  status: 'connected' | 'disconnected' | 'partial';
  description: string;
  icon: string;
}

const integrations: Integration[] = [
  { name: 'ClickUp', status: 'connected', description: 'CB + RPK workspaces sincronizados', icon: '✅' },
  { name: 'WhatsApp (Evolution)', status: 'connected', description: '6 grupos monitorados via Evolution API', icon: '💬' },
  { name: 'Google (Gmail + Calendar)', status: 'connected', description: 'Emails e eventos sincronizados', icon: '📧' },
  { name: 'Neon PostgreSQL', status: 'connected', description: 'Banco de dados de atividades', icon: '🗄️' },
  { name: 'Vercel', status: 'connected', description: 'Dashboard deployado e ativo', icon: '▲' },
  { name: 'Instagram API', status: 'partial', description: 'Sessão instável - reconectar necessário', icon: '📸' },
  { name: 'Gemini AI', status: 'connected', description: 'Processamento de linguagem e análise', icon: '🤖' },
  { name: 'ElevenLabs', status: 'connected', description: 'Text-to-speech disponível', icon: '🔊' },
  { name: 'HeyGen', status: 'connected', description: 'Geração de vídeos com avatares', icon: '🎬' },
];

const statusConfig = {
  connected: { icon: CheckCircle2, color: 'text-green-500', label: 'Conectado', bg: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' },
  disconnected: { icon: XCircle, color: 'text-red-500', label: 'Desconectado', bg: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' },
  partial: { icon: Clock, color: 'text-yellow-500', label: 'Parcial', bg: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800' },
};

export default function IntegrationsPanel() {
  return (
    <div className="space-y-4">
      {integrations.map((integration) => {
        const config = statusConfig[integration.status];
        const StatusIcon = config.icon;
        return (
          <div
            key={integration.name}
            className={cn(
              'bg-white dark:bg-gray-900 rounded-xl border p-5 hover:shadow-md transition-all',
              config.bg
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{integration.name}</h3>
                  <p className="text-xs text-gray-500">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <StatusIcon size={16} className={config.color} />
                <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
