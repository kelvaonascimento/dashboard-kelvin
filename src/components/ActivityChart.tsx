'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockData = [
  { day: 'Seg', tasks: 12, messages: 45, posts: 2 },
  { day: 'Ter', tasks: 8, messages: 38, posts: 1 },
  { day: 'Qua', tasks: 15, messages: 52, posts: 3 },
  { day: 'Qui', tasks: 10, messages: 41, posts: 0 },
  { day: 'Sex', tasks: 18, messages: 67, posts: 4 },
  { day: 'Sáb', tasks: 5, messages: 23, posts: 1 },
  { day: 'Dom', tasks: 3, messages: 15, posts: 0 },
];

export default function ActivityChart() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="font-semibold text-sm mb-4">Atividade Semanal</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
              dataKey="tasks"
              stroke="#FF6B35"
              fillOpacity={1}
              fill="url(#colorTasks)"
              name="Tarefas"
            />
            <Area
              type="monotone"
              dataKey="messages"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorMessages)"
              name="Mensagens"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
