import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
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
          content: "Tu es Léa, experte skincare de la marque Byeol. Tu réponds aux clients avec clarté, professionnalisme et bienveillance. Tu expliques les patchs anti-boutons, les délais de livraison, les retours et tu aides les clients à faire le bon choix."
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const response = completion.data.choices[0].message.content;
    res.status(200).json({ response });
  } catch (error) {
    console.error('Erreur OpenAI :', error);
    res.status(500).json({ error: `Erreur OpenAI : ${error.message || 'inconnue'}` });
  }
}
