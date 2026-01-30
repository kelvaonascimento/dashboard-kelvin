'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import ActivityFeed, { ActivityItem } from '@/components/ActivityFeed';
import ActivityChart from '@/components/ActivityChart';
import TaskList from '@/components/TaskList';
import BotStatus from '@/components/BotStatus';
import LoginScreen from '@/components/LoginScreen';
import DarkModeToggle from '@/components/DarkModeToggle';
import { cn } from '@/lib/utils';
import {
  CheckSquare,
  AlertTriangle,
  MessageSquare,
  Calendar,
  RefreshCw,
  Instagram,
} from 'lucide-react';

interface DashboardData {
  cbTasks: any[];
  rpkTasks: any[];
  cbOverdue: number;
  rpkOverdue: number;
  activities: ActivityItem[];
}

const mockActivities: ActivityItem[] = [
  { id: 1, timestamp: new Date(Date.now() - 300000).toISOString(), type: 'task_check', source: 'bot', title: 'Verificação de tarefas ClickUp', description: 'CB: 5 abertas, RPK: 3 abertas' },
  { id: 2, timestamp: new Date(Date.now() - 900000).toISOString(), type: 'message_sent', source: 'whatsapp', title: 'Relatório diário enviado', description: 'Via WhatsApp para Kelvin' },
  { id: 3, timestamp: new Date(Date.now() - 1800000).toISOString(), type: 'post_created', source: 'instagram', title: 'Post agendado no Instagram', description: 'Cultura Builder - carrossel' },
  { id: 4, timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'calendar_event', source: 'calendar', title: 'Reunião de planejamento', description: 'Google Meet às 14:00' },
  { id: 5, timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'bot_action', source: 'bot', title: 'Bot reiniciado', description: 'Atualização automática concluída' },
];

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    cbTasks: [],
    rpkTasks: [],
    cbOverdue: 0,
    rpkOverdue: 0,
    activities: mockActivities,
  });

  useEffect(() => {
    const token = document.cookie.match(/dashboard_token=([^;]+)/)?.[1];
    const urlToken = new URLSearchParams(window.location.search).get('token');
    if (token || urlToken) {
      if (urlToken) {
        document.cookie = `dashboard_token=${urlToken};path=/;max-age=2592000`;
      }
      setAuthenticated(true);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cbRes, rpkRes, actRes] = await Promise.allSettled([
        fetch('/api/clickup?workspace=cb'),
        fetch('/api/clickup?workspace=rpk'),
        fetch('/api/activities'),
      ]);

      const cbData = cbRes.status === 'fulfilled' && cbRes.value.ok ? await cbRes.value.json() : { tasks: [], overdue: 0 };
      const rpkData = rpkRes.status === 'fulfilled' && rpkRes.value.ok ? await rpkRes.value.json() : { tasks: [], overdue: 0 };
      const actData = actRes.status === 'fulfilled' && actRes.value.ok ? await actRes.value.json() : [];

      setData({
        cbTasks: cbData.tasks || [],
        rpkTasks: rpkData.tasks || [],
        cbOverdue: cbData.overdue || 0,
        rpkOverdue: rpkData.overdue || 0,
        activities: actData.length > 0 ? actData : mockActivities,
      });
    } catch (e) {
      console.error('Error fetching data:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [authenticated, fetchData]);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  const totalTasks = data.cbTasks.length + data.rpkTasks.length;
  const totalOverdue = data.cbOverdue + data.rpkOverdue;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="lg:pl-64 min-h-screen transition-all">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="pl-10 lg:pl-0">
              <h2 className="text-lg font-bold">
                {activeTab === 'overview' && 'Overview'}
                {activeTab === 'tasks' && 'Tarefas ClickUp'}
                {activeTab === 'activity' && 'Atividade Recente'}
                {activeTab === 'instagram' && 'Instagram'}
                {activeTab === 'calendar' && 'Calendário'}
                {activeTab === 'settings' && 'Configurações'}
              </h2>
              <p className="text-xs text-gray-500">Atualizado em tempo real</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className={cn(
                  'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500',
                  loading && 'animate-spin'
                )}
              >
                <RefreshCw size={18} />
              </button>
              <DarkModeToggle />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Bot Status */}
              <BotStatus online={true} />

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Tarefas Abertas"
                  value={totalTasks || '—'}
                  subtitle="CB + RPK"
                  icon={CheckSquare}
                  trend={`CB: ${data.cbTasks.length} | RPK: ${data.rpkTasks.length}`}
                  trendUp={true}
                />
                <MetricCard
                  title="Tarefas Atrasadas"
                  value={totalOverdue || 0}
                  subtitle="Precisam de atenção"
                  icon={AlertTriangle}
                  highlight={totalOverdue > 0 ? 'red' : undefined}
                />
                <MetricCard
                  title="Mensagens (24h)"
                  value="—"
                  subtitle="WhatsApp"
                  icon={MessageSquare}
                />
                <MetricCard
                  title="Próximos Eventos"
                  value="—"
                  subtitle="Próximas 24h"
                  icon={Calendar}
                />
              </div>

              {/* Chart + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityChart />
                <ActivityFeed activities={data.activities} />
              </div>

              {/* Tasks Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskList tasks={data.cbTasks} workspace="cb" loading={loading} />
                <TaskList tasks={data.rpkTasks} workspace="rpk" loading={loading} />
              </div>
            </div>
          )}

          {/* TASKS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MetricCard title="Total Abertas" value={totalTasks || '—'} icon={CheckSquare} />
                <MetricCard title="Atrasadas" value={totalOverdue || 0} icon={AlertTriangle} highlight={totalOverdue > 0 ? 'red' : undefined} />
                <MetricCard title="Concluídas Hoje" value="—" icon={CheckSquare} highlight="green" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskList tasks={data.cbTasks} workspace="cb" loading={loading} />
                <TaskList tasks={data.rpkTasks} workspace="rpk" loading={loading} />
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <ActivityChart />
              <ActivityFeed activities={data.activities} maxItems={50} />
            </div>
          )}

          {/* INSTAGRAM TAB */}
          {activeTab === 'instagram' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['Pessoal', 'Cultura Builder', 'RPK'].map((account) => (
                  <div key={account} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                        <Instagram size={20} className="text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{account}</h3>
                        <span className="text-xs text-gray-400">Conectar API</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center">
                <Instagram size={40} className="text-gray-300 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-600 dark:text-gray-400">Em breve</h3>
                <p className="text-sm text-gray-400 mt-1">Métricas do Instagram serão integradas na próxima versão</p>
              </div>
            </div>
          )}

          {/* CALENDAR TAB */}
          {activeTab === 'calendar' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center">
              <Calendar size={40} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">Em breve</h3>
              <p className="text-sm text-gray-400 mt-1">Integração com Google Calendar na próxima versão</p>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="max-w-lg space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="font-semibold text-sm mb-4">Configurações</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm">Auto-refresh</span>
                    <span className="text-xs text-gray-400">A cada 60s</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm">ClickUp CB</span>
                    <span className="text-xs text-green-500">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm">ClickUp RPK</span>
                    <span className="text-xs text-green-500">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">Banco de Dados</span>
                    <span className="text-xs text-green-500">Neon PostgreSQL</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  document.cookie = 'dashboard_token=;path=/;max-age=0';
                  setAuthenticated(false);
                }}
                className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
