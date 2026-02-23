
import { Prescription, IdentificationResult } from "./types";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-chat';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callDeepSeek(messages: DeepSeekMessage[], jsonMode: boolean = false): Promise<string> {
  const body: Record<string, unknown> = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 2048,
  };
  if (jsonMode) {
    body.response_format = { type: 'json_object' };
  }

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export const getLithotherapyAdvice = async (problem: string): Promise<Prescription> => {
  const systemPrompt = `You are a warm, professional Lithotherapist with deep expertise in global mineralogy and Indian Gemology (Vedic). You combine ancient Vedic wisdom with modern crystal healing knowledge. Focus on vibrational healing, precision, and spiritual guidance. Always be compassionate and encouraging.

You MUST respond with a valid JSON object (no markdown, no code blocks) with exactly these fields:
{
  "stoneName": "English name of the recommended gemstone",
  "hindiName": "Name in Hindi script and transliteration",
  "teluguName": "Name in Telugu script and transliteration",
  "color": "Primary color of the stone",
  "weight": "Suggested weight in carats or ratti",
  "wearingInstructions": "Detailed instructions on how and where to wear",
  "healingProperties": "Spiritual and healing properties relevant to the query",
  "cleansingMethod": "How to cleanse and recharge this stone",
  "advice": "A warm, personalized spiritual message for the seeker"
}`;

  const userPrompt = `As an expert lithotherapist with knowledge of Vedic astrology and gemstone healing, provide a healing prescription for: "${problem}". Include Indian names (Hindi and Telugu), and suggest a specific weight for therapeutic effect. Be warm, spiritual, and detailed.`;

  const result = await callDeepSeek([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], true);

  // Strip potential markdown code blocks
  const cleaned = result.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned) as Prescription;
};

export const getOracleFollowUp = async (
  originalQuery: string,
  prescription: Prescription,
  followUpQuestion: string
): Promise<string> => {
  const systemPrompt = `You are the Sacred Oracle of CrystalEcho — a wise, warm, and deeply knowledgeable lithotherapy guide. Speak with compassion and spiritual authority. Offer practical crystal healing guidance rooted in both ancient Vedic wisdom and modern mineralogy. Keep responses concise but insightful (2-4 paragraphs).`;

  const context = `Context: A seeker previously asked about: "${originalQuery}"
They were prescribed: ${prescription.stoneName} (${prescription.hindiName} / ${prescription.teluguName}).
Healing properties: ${prescription.healingProperties}
Wearing instructions: ${prescription.wearingInstructions}

The seeker now asks: "${followUpQuestion}"`;

  const result = await callDeepSeek([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: context }
  ], false);

  return result.trim();
};

export const getDailyCrystalReading = async (date: string): Promise<{ crystalName: string; affirmation: string; dayEnergy: string; guidance: string }> => {
  const systemPrompt = `You are a crystal healing oracle. Provide meaningful daily guidance based on metaphysical and astrological principles. You MUST respond with a valid JSON object (no markdown, no code blocks) with exactly these fields:
{
  "crystalName": "Name of the recommended crystal for today",
  "affirmation": "A unique daily affirmation related to this crystal",
  "dayEnergy": "Description of today's energetic theme (2-3 sentences)",
  "guidance": "Specific guidance on how to work with this crystal today (2-3 sentences)"
}`;

  const result = await callDeepSeek([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Provide a daily crystal recommendation for ${date}. Consider the day's energy, planetary alignments, and seasonal influences.` }
  ], true);

  const cleaned = result.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
};

export const identifyCrystal = async (base64Image: string): Promise<IdentificationResult> => {
  // DeepSeek doesn't support vision/image input natively like Gemini.
  // We'll use a text-based approach where the user describes or we analyze metadata.
  // For now, we send the image as a data URI in a vision-compatible format.
  // If DeepSeek doesn't support images, we fall back gracefully.

  const systemPrompt = `You are an expert gemologist and lithotherapist with knowledge of Indian gemology. You MUST respond with a valid JSON object (no markdown, no code blocks) with exactly these fields:
{
  "name": "English name of the identified crystal",
  "hindiName": "Name in Hindi",
  "teluguName": "Name in Telugu",
  "confidence": "Confidence level like 'High' or 'Moderate'",
  "primaryProperty": "The primary healing property",
  "chakra": "Associated chakra",
  "history": "A brief mythological or historical fact about the stone"
}`;

  try {
    // Try vision-capable endpoint first
    const body = {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` }
            },
            {
              type: 'text',
              text: 'Identify this crystal/gemstone and provide its lithotherapy properties. Include Hindi and Telugu names.'
            }
          ]
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 1024,
    };

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Vision not supported: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    return JSON.parse(cleaned) as IdentificationResult;
  } catch {
    // Fallback: DeepSeek may not support vision — inform user
    throw new Error('Crystal image identification requires a vision-capable model. DeepSeek text model cannot analyze images directly. Try describing the crystal to the Oracle instead.');
  }
};
