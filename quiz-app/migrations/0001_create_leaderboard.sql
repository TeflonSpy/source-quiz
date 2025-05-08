-- Create leaderboard table for quiz app
CREATE TABLE IF NOT EXISTS leaderboard (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  exam TEXT NOT NULL,
  created_at TEXT NOT NULL
);
