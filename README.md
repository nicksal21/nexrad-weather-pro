<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5e1d4b25-2a39-4cef-8880-671acc9fc76a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Set `GEMINI_API_KEY` in `.env.local` as a developer fallback, or enter your key in the app UI after starting
3. Run the app:
   `npm run dev`

## Deploy on Render

| Setting | Value |
|---------|--------|
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

Also set this environment variable on Render (or use the included `render.yaml`):

```
NODE_OPTIONS=--max-old-space-size=448
```

**Important:** Do not use `npx tsx server.ts` as the start command — it skips the heap limit and production defaults from `npm start`.

Render automatically sets `RENDER=true`, which enables low-memory radar processing (smaller images, fewer frames, file-size limits). Local runs via `npm run dev` or `npm start` use full-quality settings (2048px images, up to 10 frames, all spectral-width layers, and map overlays for AI analysis).

You can force low-memory mode locally for testing with `RADAR_LOW_MEMORY=true npm run dev`.
