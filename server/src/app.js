app.get('/api/debug', (req, res) => {
  res.json({
    hasGroqKey: !!process.env.GROQ_API_KEY,
    groqKeyPrefix: process.env.GROQ_API_KEY?.slice(0, 4),
    nodeEnv: process.env.NODE_ENV,
  });
});