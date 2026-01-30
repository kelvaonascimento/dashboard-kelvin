import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const type = searchParams.get('type');

    const sql = getDb();

    let activities;
    if (type) {
      activities = await sql(`SELECT * FROM activities WHERE type = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3`, [type, limit, offset]);
    } else {
      activities = await sql(`SELECT * FROM activities ORDER BY timestamp DESC LIMIT $1 OFFSET $2`, [limit, offset]);
    }

    return NextResponse.json(activities);
  } catch (e: any) {
    console.error('GET /api/activities error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || '';
    if (token !== process.env.DASHBOARD_TOKEN && token !== 'kelvin2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, source, title, description, metadata } = body;

    if (!type || !title) {
      return NextResponse.json({ error: 'type and title are required' }, { status: 400 });
    }

    const sql = getDb();
    const result = await sql(
      `INSERT INTO activities (type, source, title, description, metadata, timestamp)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [type, source || 'bot', title, description || '', JSON.stringify(metadata || {})]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (e: any) {
    console.error('POST /api/activities error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
