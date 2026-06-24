import { GoogleGenAI } from '@google/genai';

const STORAGE_KEY = 'nexrad_gemini_api_key';

export function getStoredApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearStoredApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getEffectiveApiKey(): string | undefined {
  const stored = getStoredApiKey()?.trim();
  if (stored) return stored;

  const envKey = process.env.GEMINI_API_KEY?.trim();
  if (envKey) return envKey;

  return undefined;
}

export function createGeminiClient(apiKey?: string): GoogleGenAI | null {
  const key = apiKey?.trim() || getEffectiveApiKey();
  if (!key) return null;
  return new GoogleGenAI({ apiKey: key });
}
