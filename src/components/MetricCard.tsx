'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeUp?: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changeUp,
  icon: Icon,
  iconBg,
  iconColor,
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              <span className={cn(
                'text-xs font-medium',
                changeUp === true ? 'text-green-500' : changeUp === false ? 'text-red-500' : 'text-gray-400'
              )}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBg)}>
          <Icon size={22} className={iconColor} />
        </div>
      </div>
    </div>
  );
}
