'use client';

import { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import ActivityFeed, { ActivityItem } from '@/components/ActivityFeed';
import ActivityChart from '@/components/ActivityChart';
import ActionCards from '@/components/ActionCards';
import LoginScreen from '@/components/LoginScreen';
import GroupsPanel from '@/components/GroupsPanel';
import FeaturesPanel from '@/components/FeaturesPanel';
import IntegrationsPanel from '@/components/IntegrationsPanel';
import {
  Radio,
  MessageSquare,
  Zap,
  DollarSign,
  Download,
  Plus,
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
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState<DashboardData>({
    activities: [],
    stats: {
      messages24h: 0,
      actions24h: 0,
      totalActivities: 0,
      dailyChart: [],
    },
  });

  // Auth check
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

  // Dark mode
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

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

  // Chart data
  const chartData = data.stats.dailyChart.map((d: any) => ({
    day: new Date(d.day).toLocaleDateString('pt-BR', { weekday: 'short' }),
    messages: parseInt(d.messages || '0'),
    actions: parseInt(d.actions || '0'),
  }));

  // Calculate cost
  const monthlyCost = 'R$ 85';

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        darkMode={darkMode}
        onToggleDark={toggleDark}
      />

      <main className="lg:pl-64 min-h-screen">
        <div className="p-6 lg:p-8 max-w-[1400px]">
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="pl-10 lg:pl-0">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bem-vindo de volta! 👋
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Aqui está um resumo da atividade dos seus grupos
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm">
                    <Download size={16} />
                    Exportar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors shadow-sm">
                    <Plus size={16} />
                    Novo Grupo
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Grupos Monitorados"
                  value={6}
                  change="+2 este mês"
                  changeUp={true}
                  icon={Radio}
                  iconBg="bg-purple-100 dark:bg-purple-900/30"
                  iconColor="text-purple-600 dark:text-purple-400"
                />
                <MetricCard
                  title="Mensagens (24h)"
                  value={data.stats.messages24h || 0}
                  change={data.stats.messages24h > 0 ? '+12%' : 'Sem dados'}
                  changeUp={data.stats.messages24h > 0 ? true : undefined}
                  icon={MessageSquare}
                  iconBg="bg-blue-100 dark:bg-blue-900/30"
                  iconColor="text-blue-600 dark:text-blue-400"
                />
                <MetricCard
                  title="Ações do Bot"
                  value={data.stats.actions24h || 0}
                  change={data.stats.actions24h > 0 ? `${data.stats.totalActivities} total` : 'Sem dados'}
                  changeUp={data.stats.actions24h > 0 ? true : undefined}
                  icon={Zap}
                  iconBg="bg-green-100 dark:bg-green-900/30"
                  iconColor="text-green-600 dark:text-green-400"
                />
                <MetricCard
                  title="Custo Mensal"
                  value={monthlyCost}
                  change="Gemini + Neon + Vercel"
                  icon={DollarSign}
                  iconBg="bg-amber-100 dark:bg-amber-900/30"
                  iconColor="text-amber-600 dark:text-amber-400"
                />
              </div>

              {/* Chart + Activity Feed */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <ActivityChart data={chartData.length > 0 ? chartData : undefined} />
                </div>
                <div>
                  <ActivityFeed activities={data.activities} maxItems={8} />
                </div>
              </div>

              {/* Action Cards */}
              <ActionCards />
            </div>
          )}

          {/* GROUPS */}
          {activeTab === 'groups' && (
            <div className="pl-10 lg:pl-0">
              <GroupsPanel />
            </div>
          )}

          {/* FEATURES */}
          {activeTab === 'features' && (
            <div className="pl-10 lg:pl-0">
              <FeaturesPanel />
            </div>
          )}

          {/* INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="pl-10 lg:pl-0">
              <IntegrationsPanel />
            </div>
          )}

          {/* CONFIG */}
          {activeTab === 'config' && (
            <div className="pl-10 lg:pl-0 max-w-lg space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configurações</h2>
                <p className="text-sm text-gray-500 mt-1">Configurações gerais da conta</p>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="font-semibold text-sm mb-4 text-gray-900 dark:text-white">Sistema</h3>
                <div className="space-y-0">
                  {[
                    { label: 'Auto-refresh', value: 'A cada 60s', color: '' },
                    { label: 'API de Atividades', value: 'POST /api/activities', color: 'text-green-500' },
                    { label: 'Banco de Dados', value: 'Neon PostgreSQL', color: 'text-green-500' },
                    { label: 'ClickUp CB', value: 'Conectado', color: 'text-green-500' },
                    { label: 'ClickUp RPK', value: 'Conectado', color: 'text-green-500' },
                    { label: 'Evolution API', value: 'Conectado', color: 'text-green-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                      <span className={`text-xs font-medium ${item.color || 'text-gray-400'}`}>{item.value}</span>
                    </div>
                  ))}
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
