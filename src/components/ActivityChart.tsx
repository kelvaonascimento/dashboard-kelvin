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
  const chartData = data && data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Atividade dos Grupos</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            Mensagens
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
            Ações do Bot
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorActions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="rgba(128,128,128,0.3)" />
            <YAxis tick={{ fontSize: 12 }} stroke="rgba(128,128,128,0.3)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="messages"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorMessages)"
              name="Mensagens"
            />
            <Area
              type="monotone"
              dataKey="actions"
              stroke="#FF6B35"
              fillOpacity={1}
              fill="url(#colorActions)"
              name="Ações"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
