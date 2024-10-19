import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { drawingDescription } = req.body;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Guess what is being drawn: ${drawingDescription}`,
    max_tokens: 50,
  });

  res.status(200).json({ guess: completion.data.choices[0].text });
}
