const dotenv = require('dotenv');
dotenv.config();

const userContent = process.argv[2] || 'What is the meaning of life?'

fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: process.env.MODEL_NAME,
    messages: [
      {
        role: 'user',
        content: userContent,
      },
    ],
    max_tokens: 100,
  }),
}).then((response) => response.json())
  .then((data) => {
    console.log('Response from OpenRouter:', data.choices[0].message.content);
  }).catch((error) => {
    console.error('Error:', error);
  });

// Execute by running: node main.js "Your question here"
// Example: node main.js "What is the capital of France?"
