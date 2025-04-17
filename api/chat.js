export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log("🔑 Clé API OpenAI côté serveur :", apiKey);

  if (!apiKey) {
    return res.status(500).json({
      error: "❌ Clé API OpenAI manquante dans process.env (pas transmise par Vercel)."
    });
  }

  return res.status(200).json({
    message: "✅ Clé API reçue par le serveur. Tout est prêt pour appeler OpenAI."
  });
}
