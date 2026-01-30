'use client';

import { useState } from 'react';
import { Zap, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (token: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/auth?token=${password}`);
    if (res.ok) {
      document.cookie = `dashboard_token=${password};path=/;max-age=2592000`;
      onLogin(password);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Kelvin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Painel operacional CB & RPK</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              <Lock size={14} className="inline mr-1" />
              Senha de acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Digite a senha..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">Senha incorreta</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white rounded-lg text-sm font-medium transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
