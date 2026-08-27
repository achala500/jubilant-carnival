import express from 'express';

const app = express();
app.use(express.json());

let history = [];

app.post('/submitDailyLog', (req, res) => {
  const { date, sessions, totalHours, manualOverride } = req.body;

  if (!sessions || !Array.isArray(sessions)) {
    return res.status(400).json({ error: 'Sessions array is required' });
  }

  const logEntry = {
    id: Date.now().toString(),
    date,
    sessions,
    totalHours,
    manualOverride,
    createdAt: new Date().toISOString()
  };

  history.push(logEntry);
  res.status(201).json({ success: true, entry: logEntry });
});

app.get('/history', (req, res) => {
  res.json({ history });
});

app.listen(3001, () => console.log('Mock server running on port 3001'));
