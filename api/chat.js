import { Configuration, OpenAIApi } from 'openai';

console.log("🧪 Clé OpenAI détectée :", process.env.OPENAI_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Aucune clé API détectée dans process.env');
    return res.status(500).json({
      error: "Clé API OpenAI manquante. Vérifie les variables d’environnement sur Vercel.",
    });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: "Tu es Léa, l'experte skincare de la marque Byeol. Tu donnes des conseils clairs et professionnels sur les patchs anti-boutons, les retours, la livraison, etc.",
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
    console.error('❌ Erreur OpenAI complète :', error);
    res.status(500).json({
      error: `Erreur OpenAI : ${error.message || 'inconnue'}`,
    });
  }
}
