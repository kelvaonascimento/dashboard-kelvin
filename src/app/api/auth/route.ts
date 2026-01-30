import { NextRequest, NextResponse } from 'next/server';

const DASHBOARD_TOKEN = process.env.DASHBOARD_TOKEN || 'kelvin2024';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (token === DASHBOARD_TOKEN) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
