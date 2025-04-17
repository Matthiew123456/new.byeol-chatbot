import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message manquant dans la requête.' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "Tu es Léa, l'experte skincare de Byeol. Tu expliques les produits, les retours, les délais, tout avec professionnalisme, clarté et bienveillance.",
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const response = completion.data.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error('Erreur OpenAI :', error);
    res.status(500).json({
      error: `Erreur OpenAI : ${error.message || 'inconnue'}`,
    });
  }
}
