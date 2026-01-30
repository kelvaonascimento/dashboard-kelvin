'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartData {
  day: string;
  messages: number;
  actions: number;
}

interface ActivityChartProps {
  data?: ChartData[];
}

const fallbackData: ChartData[] = [
  { day: 'Seg', messages: 45, actions: 12 },
  { day: 'Ter', messages: 38, actions: 8 },
  { day: 'Qua', messages: 52, actions: 15 },
  { day: 'Qui', messages: 41, actions: 10 },
  { day: 'Sex', messages: 67, actions: 18 },
  { day: 'Sáb', messages: 23, actions: 5 },
  { day: 'Dom', messages: 15, actions: 3 },
];

export default function ActivityChart({ data }: ActivityChartProps) {
  const [period, setPeriod] = useState<'7' | '30' | '90'>('7');
  const chartData = data && data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Atividade dos Grupos</h3>
          <p className="text-xs text-gray-400 mt-0.5">Mensagens nos últimos {period} dias</p>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          {(['7', '30', '90'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                period === p
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {p}d
            </button>
          ))}
        </div>
      </div>
      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="colorActions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.08)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '12px',
                padding: '8px 12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="messages"
              stroke="#7C5CFC"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMessages)"
              name="Mensagens"
            />
            <Area
              type="monotone"
              dataKey="actions"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActions)"
              name="Ações do Bot"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
