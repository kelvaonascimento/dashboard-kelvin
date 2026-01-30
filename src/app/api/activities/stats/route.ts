import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function GET() {
  try {
    const sql = getDb();

    const [messages24h, actions24h, totalActivities, dailyChart] = await Promise.all([
      sql(`SELECT COUNT(*) as count FROM activities WHERE type = 'whatsapp_monitor' AND timestamp > NOW() - INTERVAL '24 hours'`),
      sql(`SELECT COUNT(*) as count FROM activities WHERE type != 'whatsapp_monitor' AND timestamp > NOW() - INTERVAL '24 hours'`),
      sql(`SELECT COUNT(*) as count FROM activities`),
      sql(`
        SELECT 
          DATE(timestamp) as day,
          COUNT(*) FILTER (WHERE type = 'whatsapp_monitor') as messages,
          COUNT(*) FILTER (WHERE type != 'whatsapp_monitor') as actions
        FROM activities
        WHERE timestamp > NOW() - INTERVAL '30 days'
        GROUP BY DATE(timestamp)
        ORDER BY day ASC
      `),
    ]);

    return NextResponse.json({
      messages24h: parseInt(messages24h[0]?.count || '0'),
      actions24h: parseInt(actions24h[0]?.count || '0'),
      totalActivities: parseInt(totalActivities[0]?.count || '0'),
      dailyChart,
    });
  } catch (e: any) {
    console.error('GET /api/activities/stats error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
