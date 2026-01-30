import { NextResponse } from 'next/server';

// Returns mock activities for now — will connect to Neon DB
export async function GET() {
  const activities = [
    { id: 1, timestamp: new Date(Date.now() - 300000).toISOString(), type: 'task_check', source: 'bot', title: 'Verificação de tarefas ClickUp', description: 'Scan automático concluído' },
    { id: 2, timestamp: new Date(Date.now() - 900000).toISOString(), type: 'message_sent', source: 'whatsapp', title: 'Relatório enviado', description: 'Resumo diário via WhatsApp' },
    { id: 3, timestamp: new Date(Date.now() - 1800000).toISOString(), type: 'post_created', source: 'instagram', title: 'Conteúdo agendado', description: 'Cultura Builder - Instagram' },
    { id: 4, timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'calendar_event', source: 'calendar', title: 'Lembrete de reunião', description: 'Reunião de planejamento semanal' },
    { id: 5, timestamp: new Date(Date.now() - 7200000).toISOString(), type: 'bot_action', source: 'bot', title: 'Bot health check', description: 'Todos os sistemas operacionais' },
  ];

  return NextResponse.json(activities);
}

export async function POST(request: Request) {
  // Endpoint for the bot to log activities
  try {
    const body = await request.json();
    // TODO: Save to Neon DB
    console.log('New activity:', body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}
