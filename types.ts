
export interface Crystal {
  id: string;
  name: string;
  hindiName: string;
  teluguName: string;
  color: string;
  element: string;
  chakra: 'Root' | 'Sacral' | 'Solar Plexus' | 'Heart' | 'Throat' | 'Third Eye' | 'Crown';
  description: string;
  vedicInfo: string;
  properties: string[];
  image: string;
}

export interface HealingMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  howTo: string[];
}

export interface Prescription {
  stoneName: string;
  hindiName: string;
  teluguName: string;
  color: string;
  weight: string;
  wearingInstructions: string;
  healingProperties: string;
  cleansingMethod: string;
  advice: string;
}

export interface IdentificationResult {
  name: string;
  hindiName: string;
  teluguName: string;
  confidence: string;
  primaryProperty: string;
  chakra: string;
  history: string;
}

export interface OracleMessage {
  id: string;
  role: 'user' | 'oracle';
  content: string;
  timestamp: number;
  prescription?: Prescription;
}

export interface SavedReading {
  id: string;
  query: string;
  prescription: Prescription;
  timestamp: number;
}

export interface DailyCrystal {
  crystal: Crystal;
  affirmation: string;
  dayEnergy: string;
}

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export type AppState = 'home' | 'methods' | 'scanner' | 'collection' | 'oracle';
