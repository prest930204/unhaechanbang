import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();
  app.use(express.json());

  // Telegram Webhook / Booking API
  app.post('/api/booking', async (req, res) => {
    const { partnerName, name, phone, time, rehabArea } = req.body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram bot credentials not configured.');
      // Return success anyway so UI can progress (for demo purposes if env vars aren't set)
      return res.status(200).json({ success: true, warning: 'Telegram not configured' });
    }

    const message = `
새로운 예약 접수
업체명 : ${partnerName || '미기재'}
성함 : ${name}
전화번호 : ${phone}
희망 운동시간 : ${time}
재활 희망 부위 : ${rehabArea}
`.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.statusText}`);
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      res.status(500).json({ success: false, error: 'Failed to send message' });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist', 'client');
    app.use(express.static(distPath));
    app.use('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
