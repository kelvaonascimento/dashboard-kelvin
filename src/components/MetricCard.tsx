'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  highlight?: 'red' | 'green' | 'orange';
  className?: string;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendUp,
  highlight,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-all hover:shadow-md',
        highlight === 'red' && 'border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20',
        highlight === 'green' && 'border-green-300 dark:border-green-800',
        highlight === 'orange' && 'border-brand-orange/30',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
          <p className={cn(
            'text-2xl font-bold mt-1',
            highlight === 'red' && 'text-red-600 dark:text-red-400'
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          'p-2.5 rounded-lg',
          highlight === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
          highlight === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
          'bg-brand-orange/10'
        )}>
          <Icon size={20} className={cn(
            highlight === 'red' ? 'text-red-600 dark:text-red-400' :
            highlight === 'green' ? 'text-green-600 dark:text-green-400' :
            'text-brand-orange'
          )} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span className={cn(
            'text-xs font-medium',
            trendUp ? 'text-green-600' : 'text-red-500'
          )}>
            {trend}
          </span>
        </div>
      )}
    </div>
  );
}
