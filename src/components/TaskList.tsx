'use client';

import { cn } from '@/lib/utils';
import { Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Task {
  id: string;
  name: string;
  status: { status: string; color: string };
  assignees: { username: string }[];
  due_date: string | null;
  url: string;
}

interface TaskListProps {
  tasks: Task[];
  workspace: 'cb' | 'rpk';
  loading?: boolean;
}

const statusColors: Record<string, string> = {
  open: 'bg-gray-200 text-gray-700',
  'in progress': 'bg-blue-100 text-blue-700',
  review: 'bg-purple-100 text-purple-700',
  complete: 'bg-green-100 text-green-700',
  closed: 'bg-green-100 text-green-700',
};

export default function TaskList({ tasks, workspace, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const now = Date.now();
  const isOverdue = (task: Task) =>
    task.due_date && parseInt(task.due_date) < now && task.status.status !== 'complete';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2 py-0.5 rounded text-xs font-bold text-white',
            workspace === 'cb' ? 'bg-brand-orange' : 'bg-purple-600'
          )}>
            {workspace.toUpperCase()}
          </span>
          <h3 className="font-semibold text-sm">
            {workspace === 'cb' ? 'Cultura Builder' : 'Agência RPK'}
          </h3>
        </div>
        <span className="text-xs text-gray-400">{tasks.length} tarefas</span>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-96 overflow-y-auto">
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">Nenhuma tarefa encontrada</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              'p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
              isOverdue(task) && 'bg-red-50/50 dark:bg-red-950/10'
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{task.name}</p>
                {isOverdue(task) && <AlertTriangle size={14} className="text-red-500 flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={cn(
                    'text-xs px-1.5 py-0.5 rounded font-medium',
                    statusColors[task.status.status.toLowerCase()] || 'bg-gray-100 text-gray-600'
                  )}
                >
                  {task.status.status}
                </span>
                {task.assignees?.[0] && (
                  <span className="text-xs text-gray-400">
                    {task.assignees[0].username}
                  </span>
                )}
                {task.due_date && (
                  <span className={cn(
                    'text-xs flex items-center gap-1',
                    isOverdue(task) ? 'text-red-500 font-medium' : 'text-gray-400'
                  )}>
                    <Clock size={10} />
                    {formatDistanceToNow(new Date(parseInt(task.due_date)), { addSuffix: true, locale: ptBR })}
                  </span>
                )}
              </div>
            </div>
            <a
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-orange transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
