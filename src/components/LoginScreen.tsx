'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (token: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/auth?token=${password}`);
    if (res.ok) {
      document.cookie = `dashboard_token=${password};path=/;max-age=2592000`;
      onLogin(password);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kelvão Bot</h1>
          <p className="text-gray-500 text-sm mt-1">Bot-as-a-Service Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
              <Lock size={14} className="inline mr-1.5 text-gray-400" />
              Senha de acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Digite a senha..."
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">Senha incorreta</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-medium transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
