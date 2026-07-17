# AI-Digital-Twin

Personal site for Sonu Yadav, with an AI digital twin answering questions about his background.

Next.js 16, App Router, TypeScript, Tailwind 4. Deploys to Netlify with the Netlify Next.js runtime.

```
npm install
npm run dev
```

`LinkedIn.md` is the source of truth for every factual claim on the site. `CLAUDE.md` holds the
spec and constraints.

The twin calls OpenRouter server-side from `/api/twin`, reading `OPENROUTER_API_KEY`. Set it in
`.env` for local development and in the Netlify dashboard for production. The key is never committed
and never reaches the browser.
