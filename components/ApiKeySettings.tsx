import React, { useEffect, useState } from 'react';
import { Key, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  clearStoredApiKey,
  getEffectiveApiKey,
  getStoredApiKey,
  setStoredApiKey,
} from '@/lib/geminiApiKey';

interface ApiKeySettingsProps {
  onKeyChange?: (hasKey: boolean) => void;
}

export function ApiKeySettings({ onKeyChange }: ApiKeySettingsProps) {
  const [draft, setDraft] = useState('');
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const [hasEnvKey, setHasEnvKey] = useState(false);

  useEffect(() => {
    const stored = getStoredApiKey();
    setDraft(stored ?? '');
    setHasSavedKey(!!stored?.trim());
    setHasEnvKey(!!process.env.GEMINI_API_KEY?.trim() && !stored?.trim());
    onKeyChange?.(!!getEffectiveApiKey());
  }, [onKeyChange]);

  const handleSave = () => {
    if (!draft.trim()) return;
    setStoredApiKey(draft);
    setHasSavedKey(true);
    setHasEnvKey(false);
    onKeyChange?.(true);
  };

  const handleClear = () => {
    clearStoredApiKey();
    setDraft('');
    setHasSavedKey(false);
    setHasEnvKey(!!process.env.GEMINI_API_KEY?.trim());
    onKeyChange?.(!!process.env.GEMINI_API_KEY?.trim());
  };

  const isConfigured = hasSavedKey || hasEnvKey;

  return (
    <div className="w-full md:w-auto border border-[#141414]/20 bg-[#141414]/5 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 opacity-60" />
          <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">
            Gemini API Key
          </span>
        </div>
        {isConfigured && (
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-emerald-700">
            <Check className="w-3 h-3" />
            {hasSavedKey ? 'Saved' : 'From env'}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          type="password"
          placeholder="Paste your Gemini API key..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="bg-transparent border-[#141414] rounded-none focus-visible:ring-0 focus-visible:border-b-2 font-mono text-xs"
          autoComplete="off"
        />
        <Button
          type="button"
          onClick={handleSave}
          disabled={!draft.trim()}
          className="bg-[#141414] text-[#E4E3E0] rounded-none hover:bg-[#141414]/90 uppercase font-bold tracking-tight text-[10px] px-4 shrink-0"
        >
          Save
        </Button>
        {hasSavedKey && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="rounded-none border-[#141414] px-3 shrink-0"
            aria-label="Clear saved API key"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>

      <p className="text-[10px] font-mono opacity-50 leading-relaxed">
        Required for city/zip geocoding and AI storm analysis. Stored locally in your browser.{' '}
        <a
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="underline opacity-80 hover:opacity-100"
        >
          Get a key
        </a>
      </p>
    </div>
  );
}
