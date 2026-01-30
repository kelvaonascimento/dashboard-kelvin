import { NextRequest, NextResponse } from 'next/server';

const WORKSPACES: Record<string, { token: string; teamId: string }> = {
  cb: {
    token: process.env.CLICKUP_CB_TOKEN || 'pk_272508873_R445OIF85W1PFIFSB61YQVX0J3E8QD2D',
    teamId: '90132921356',
  },
  rpk: {
    token: process.env.CLICKUP_RPK_TOKEN || 'pk_170500153_7SAEXFGYE8JNDWEBXQDGYN51GDUB6429',
    teamId: '9013477799',
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const workspace = searchParams.get('workspace') || 'cb';
  
  const config = WORKSPACES[workspace];
  if (!config) {
    return NextResponse.json({ error: 'Invalid workspace' }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.clickup.com/api/v2/team/${config.teamId}/task?page=0&order_by=due_date&subtasks=true&include_closed=false`,
      {
        headers: { Authorization: config.token },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(`ClickUp API error for ${workspace}: ${res.status}`);
      return NextResponse.json({ tasks: [], overdue: 0, total: 0 });
    }

    const data = await res.json();
    const tasks = data.tasks || [];
    const now = Date.now();
    const overdue = tasks.filter(
      (t: any) => t.due_date && parseInt(t.due_date) < now && t.status?.status?.toLowerCase() !== 'complete' && t.status?.status?.toLowerCase() !== 'closed'
    ).length;

    return NextResponse.json({
      tasks,
      overdue,
      total: tasks.length,
    });
  } catch (error) {
    console.error(`ClickUp fetch error for ${workspace}:`, error);
    return NextResponse.json({ tasks: [], overdue: 0, total: 0 });
  }
}
