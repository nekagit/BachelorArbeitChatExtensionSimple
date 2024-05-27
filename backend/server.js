const express = require('express');
const bodyParser = require('body-parser');
const { pipeline } = require('@xenova/transformers');

const app = express();
const port = 5000;

const generator = await pipeline('text-generation', 'EleutherAI/gpt-neo-2.7B');

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const output = await generator(userMessage, { max_length: 50 });
    res.json({ reply: output[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
