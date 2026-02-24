
import { Prescription, IdentificationResult } from "./types";

// ─── Provider Configuration ───
export type AIProvider = 'deepseek' | 'gemini' | 'groq';

interface ProviderConfig {
  name: string;
  icon: string;
  description: string;
}

export const AI_PROVIDERS: Record<AIProvider, ProviderConfig> = {
  deepseek: { name: 'DeepSeek', icon: '🌊', description: 'DeepSeek Chat — Fast & capable' },
  gemini: { name: 'Gemini', icon: '✦', description: 'Google Gemini 2.0 Flash' },
  groq: { name: 'Groq', icon: '⚡', description: 'Groq LLaMA — Ultra fast inference' },
};

let currentProvider: AIProvider = 'deepseek';

export const setProvider = (p: AIProvider) => { currentProvider = p; };
export const getProvider = (): AIProvider => currentProvider;

// ─── API Keys & Endpoints ───
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || '';
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GROQ_KEY = process.env.GROQ_API_KEY || '';

// ─── Universal Chat Interface ───
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

async function callAI(messages: ChatMessage[], jsonMode: boolean = false): Promise<string> {
  switch (currentProvider) {
    case 'deepseek': return callDeepSeek(messages, jsonMode);
    case 'gemini': return callGemini(messages, jsonMode);
    case 'groq': return callGroq(messages, jsonMode);
    default: return callDeepSeek(messages, jsonMode);
  }
}

// ─── DeepSeek (OpenAI-compatible) ───
async function callDeepSeek(messages: ChatMessage[], jsonMode: boolean): Promise<string> {
  const body: Record<string, unknown> = {
    model: 'deepseek-chat',
    messages,
    temperature: 0.7,
    max_tokens: 2048,
  };
  if (jsonMode) body.response_format = { type: 'json_object' };

  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`DeepSeek Error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Google Gemini (REST API) ───
async function callGemini(messages: ChatMessage[], jsonMode: boolean): Promise<string> {
  const systemMsg = messages.find(m => m.role === 'system');
  const userMsgs = messages.filter(m => m.role !== 'system');

  const contents = userMsgs.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      ...(jsonMode ? { responseMimeType: 'application/json' } : {})
    },
  };
  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Gemini Error (${res.status}): ${await res.text()}`);
  const data = await res.json();

  if (!data.candidates || !data.candidates[0]) throw new Error('No response from Gemini');
  return data.candidates[0].content.parts[0].text;
}

// ─── Groq (OpenAI-compatible) ───
async function callGroq(messages: ChatMessage[], jsonMode: boolean): Promise<string> {
  const body: Record<string, unknown> = {
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.7,
    max_tokens: 2048,
  };
  if (jsonMode) body.response_format = { type: 'json_object' };

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Groq Error (${res.status}): ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Clean JSON from markdown fences ───
function cleanJSON(text: string): string {
  return text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
}

// ─── Oracle: Main Prescription ───
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

  const result = await callAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ], true);

  return JSON.parse(cleanJSON(result)) as Prescription;
};

// ─── Oracle: Follow-up Conversation ───
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

  const result = await callAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: context }
  ], false);

  return result.trim();
};

// ─── Daily Crystal ───
export const getDailyCrystalReading = async (date: string): Promise<{ crystalName: string; affirmation: string; dayEnergy: string; guidance: string }> => {
  const systemPrompt = `You are a crystal healing oracle. Provide meaningful daily guidance based on metaphysical and astrological principles. You MUST respond with a valid JSON object (no markdown, no code blocks) with exactly these fields:
{
  "crystalName": "Name of the recommended crystal for today",
  "affirmation": "A unique daily affirmation related to this crystal",
  "dayEnergy": "Description of today's energetic theme (2-3 sentences)",
  "guidance": "Specific guidance on how to work with this crystal today (2-3 sentences)"
}`;

  const result = await callAI([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Provide a daily crystal recommendation for ${date}. Consider the day's energy, planetary alignments, and seasonal influences.` }
  ], true);

  return JSON.parse(cleanJSON(result));
};

// ─── Crystal Scanner ───
export const identifyCrystal = async (base64Image: string): Promise<IdentificationResult> => {
  // Only Gemini supports vision natively
  if (currentProvider === 'gemini') {
    const systemPrompt = `You are an expert gemologist and lithotherapist with knowledge of Indian gemology. You MUST respond with a valid JSON object with exactly these fields:
{
  "name": "English name of the identified crystal",
  "hindiName": "Name in Hindi",
  "teluguName": "Name in Telugu",
  "confidence": "Confidence level like 'High' or 'Moderate'",
  "primaryProperty": "The primary healing property",
  "chakra": "Associated chakra",
  "history": "A brief mythological or historical fact about the stone"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
    const body = {
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: 'Identify this crystal/gemstone and provide its lithotherapy properties. Include Hindi and Telugu names. Respond in JSON only.' }
        ]
      }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024, responseMimeType: 'application/json' }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Gemini Vision Error (${res.status}): ${await res.text()}`);
    const data = await res.json();
    const text = data.candidates[0].content.parts[0].text;
    return JSON.parse(cleanJSON(text)) as IdentificationResult;
  }

  // For non-vision providers, inform the user
  throw new Error(`Crystal image identification requires Gemini (vision-capable). Please switch to Gemini provider in the dropdown, or describe your crystal to the Oracle instead.`);
};
