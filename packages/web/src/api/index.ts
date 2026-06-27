import { Hono } from 'hono';
import { cors } from "hono/cors"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono()
  .basePath('api')
  .use(cors({ origin: (origin) => origin ?? "*", credentials: true, exposeHeaders: ["set-auth-token"] }))
  .get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }, 200))
  .get('/health', (c) => c.json({ status: 'ok' }, 200))
  .post('/ask-swami', async (c) => {
    const { name, question } = await c.req.json();

    if (!name || !question) {
      return c.json({ error: 'Name and question are required' }, 400);
    }

    try {
      await resend.emails.send({
        from: 'The Ignorant Yogi <noreply@yinyogameridians.com>',
        to: 'jeremy.meridianttc@gmail.com',
        subject: `Ask the Swami: ${name} wants to know`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FAF7F2;">
            <h2 style="color: #C87941; font-size: 24px;">A seeker hath submitted a question</h2>
            <hr style="border: 1px solid #B8963E; margin: 20px 0;" />
            <p style="color: #5A5047;"><strong>From:</strong> ${name}</p>
            <p style="color: #1A1A1A; font-size: 18px; font-style: italic;">"${question}"</p>
            <hr style="border: 1px solid #E8DDD0; margin: 20px 0;" />
            <p style="color: #5A5047; font-size: 12px;">Submitted via TheIgnorantYogi.com</p>
          </div>
        `,
      });
      return c.json({ success: true }, 200);
    } catch (error) {
      console.error('Email send failed:', error);
      return c.json({ error: 'Failed to send question' }, 500);
    }
  });

export type AppType = typeof app;
export default app;
