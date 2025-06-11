require('dotenv').config({ path: 'src/.env' });
const OpenAI = require('openai');
const Summary = require('../models/Summary');

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function processSummary(videoText, userId, videoId) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Summarize concisely' },
      { role: 'user', content: videoText }
    ],
    stream: false
  });
  const summaryText = completion.choices[0].message.content;
  await Summary.create({ userId, videoId, summaryText });
  return summaryText;
}

module.exports = { processSummary };
