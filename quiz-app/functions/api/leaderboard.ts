import { Hono } from 'hono';
/// <reference types="@cloudflare/workers-types" />

type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// Middleware to handle CORS preflight requests
// POST /api/leaderboard - submit a score
app.post('/', async (c) => {
  const { name, score, exam } = await c.req.json();
  if (!name || typeof score !== 'number' || !exam) {
    return c.json({ error: 'Invalid data' }, 400);
  }
  await c.env.DB.prepare(
    'INSERT INTO leaderboard (name, score, exam, created_at) VALUES (?, ?, ?, datetime(\'now\'))'
  ).bind(name, score, exam).run();
  return c.json({ success: true });
});

// GET /api/leaderboard?exam=... - fetch leaderboard
app.get('/', async (c) => {
  const exam = c.req.query('exam');
  let query = 'SELECT name, score, exam, created_at FROM leaderboard';
  let params: any[] = [];
  if (exam) {
    query += ' WHERE exam = ?';
    params.push(exam);
  }
  query += ' ORDER BY score DESC, created_at ASC LIMIT 20';
  const result = await c.env.DB.prepare(query).bind(...params).all();
  return c.json(result.results);
});

export default app;
