'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import ActivityFeed, { ActivityItem } from '@/components/ActivityFeed';
import ActivityChart from '@/components/ActivityChart';
import BotStatus from '@/components/BotStatus';
import LoginScreen from '@/components/LoginScreen';
import DarkModeToggle from '@/components/DarkModeToggle';
import GroupsPanel from '@/components/GroupsPanel';
import IntegrationsPanel from '@/components/IntegrationsPanel';
import { cn } from '@/lib/utils';
import {
  Radio,
  MessageSquare,
  Zap,
  DollarSign,
  RefreshCw,
} from 'lucide-react';

interface DashboardData {
  activities: ActivityItem[];
  stats: {
    messages24h: number;
    actions24h: number;
    totalActivities: number;
    dailyChart: any[];
  };
}

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    activities: [],
    stats: {
      messages24h: 0,
      actions24h: 0,
      totalActivities: 0,
      dailyChart: [],
    },
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
      const [actRes, statsRes] = await Promise.allSettled([
        fetch('/api/activities?limit=50'),
        fetch('/api/activities/stats'),
      ]);

      const actData = actRes.status === 'fulfilled' && actRes.value.ok ? await actRes.value.json() : [];
      const statsData = statsRes.status === 'fulfilled' && statsRes.value.ok ? await statsRes.value.json() : {};

      setData({
        activities: Array.isArray(actData) ? actData : [],
        stats: {
          messages24h: statsData.messages24h || 0,
          actions24h: statsData.actions24h || 0,
          totalActivities: statsData.totalActivities || 0,
          dailyChart: statsData.dailyChart || [],
        },
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

  // Format chart data
  const chartData = data.stats.dailyChart.map((d: any) => ({
    day: new Date(d.day).toLocaleDateString('pt-BR', { weekday: 'short' }),
    messages: parseInt(d.messages || '0'),
    actions: parseInt(d.actions || '0'),
  }));

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
                {activeTab === 'activity' && 'Atividade do Bot'}
                {activeTab === 'groups' && 'Grupos & Canais'}
                {activeTab === 'integrations' && 'Integrações'}
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
                  title="Grupos Monitorados"
                  value={6}
                  subtitle="WhatsApp ativo"
                  icon={Radio}
                  trend="GPC, Wind, MBigucci, Exkalla, CB Exec, CB Mkt"
                  trendUp={true}
                />
                <MetricCard
                  title="Mensagens (24h)"
                  value={data.stats.messages24h || '—'}
                  subtitle="Processadas pelo bot"
                  icon={MessageSquare}
                  highlight="green"
                />
                <MetricCard
                  title="Ações do Bot (24h)"
                  value={data.stats.actions24h || '—'}
                  subtitle="Carrosséis, checks, alertas"
                  icon={Zap}
                  highlight="orange"
                />
                <MetricCard
                  title="Custo Mensal"
                  value="~R$ 85"
                  subtitle="APIs + Infra"
                  icon={DollarSign}
                  trend="Gemini, Neon, Vercel, Evolution"
                />
              </div>

              {/* Chart + Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityChart data={chartData.length > 0 ? chartData : undefined} />
                <ActivityFeed activities={data.activities} />
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <ActivityChart data={chartData.length > 0 ? chartData : undefined} />
              <ActivityFeed activities={data.activities} maxItems={100} />
            </div>
          )}

          {/* GROUPS TAB */}
          {activeTab === 'groups' && <GroupsPanel />}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'integrations' && <IntegrationsPanel />}

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
                    <span className="text-sm">API de Atividades</span>
                    <span className="text-xs text-green-500">POST /api/activities</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm">Banco de Dados</span>
                    <span className="text-xs text-green-500">Neon PostgreSQL</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm">ClickUp CB</span>
                    <span className="text-xs text-green-500">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">ClickUp RPK</span>
                    <span className="text-xs text-green-500">Conectado</span>
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
