interface ClickUpTask {
  id: string;
  name: string;
  status: { status: string; color: string };
  assignees: { username: string }[];
  due_date: string | null;
  date_created: string;
  url: string;
}

const WORKSPACES = {
  cb: {
    token: process.env.CLICKUP_CB_TOKEN || 'pk_272508873_R445OIF85W1PFIFSB61YQVX0J3E8QD2D',
    teamId: '90132921356',
  },
  rpk: {
    token: process.env.CLICKUP_RPK_TOKEN || 'pk_170500153_7SAEXFGYE8JNDWEBXQDGYN51GDUB6429',
    teamId: '9013477799',
  },
};

export type Workspace = 'cb' | 'rpk';

async function fetchClickUp(path: string, token: string) {
  const res = await fetch(`https://api.clickup.com/api/v2${path}`, {
    headers: { Authorization: token },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    console.error(`ClickUp API error: ${res.status} ${res.statusText}`);
    return null;
  }
  return res.json();
}

export async function getTasks(workspace: Workspace): Promise<ClickUpTask[]> {
  const config = WORKSPACES[workspace];
  if (!config) return [];
  
  try {
    const data = await fetchClickUp(
      `/team/${config.teamId}/task?page=0&order_by=due_date&subtasks=true&include_closed=false`,
      config.token
    );
    return data?.tasks || [];
  } catch (e) {
    console.error(`Error fetching ${workspace} tasks:`, e);
    return [];
  }
}

export async function getTaskCount(workspace: Workspace) {
  const tasks = await getTasks(workspace);
  const now = Date.now();
  const overdue = tasks.filter(
    (t) => t.due_date && parseInt(t.due_date) < now && t.status.status !== 'complete'
  );
  return {
    total: tasks.length,
    overdue: overdue.length,
    tasks,
  };
}
