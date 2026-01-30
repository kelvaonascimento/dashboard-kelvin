import { NextRequest } from 'next/server';

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || 'kelvin2024';

export function checkAuth(request: NextRequest): boolean {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const cookie = request.cookies.get('dashboard_token')?.value;
  return token === DASHBOARD_TOKEN || cookie === DASHBOARD_TOKEN;
}

export function getAuthToken() {
  return DASHBOARD_TOKEN;
}
