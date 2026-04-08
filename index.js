const express = require('express');
const app = express();
app.use(express.json());

app.get('/balance/:userId', (req, res) => {
  res.json({ balance: 0, userId: req.params.userId });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log('Server running on port ' + PORT));
