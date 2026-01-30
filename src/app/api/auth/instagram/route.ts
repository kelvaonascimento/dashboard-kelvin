import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');
  
  if (error) {
    return NextResponse.json({ error, description: request.nextUrl.searchParams.get('error_description') });
  }
  
  if (!code) {
    return NextResponse.json({ error: 'No code received' });
  }
  
  // Exchange code for token
  // We'll display the code so the bot can exchange it
  return new NextResponse(`
    <html>
      <body style="font-family:system-ui;padding:40px;max-width:600px;margin:auto">
        <h1>✅ Instagram Conectado!</h1>
        <p>Código recebido. Copie e envie no Telegram:</p>
        <textarea style="width:100%;height:100px;font-size:14px" onclick="this.select()">${code}</textarea>
        <p>Ou feche esta janela — o bot já recebeu o código.</p>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}
