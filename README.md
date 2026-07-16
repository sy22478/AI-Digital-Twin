# AI-Digital-Twin

Personal site for Sonu Yadav, with an AI digital twin answering questions about his background.

Next.js 16, App Router, TypeScript, Tailwind 4. Deploys to Vercel.

```
npm install
npm run dev
```

`LinkedIn.md` is the source of truth for every factual claim on the site. `CLAUDE.md` holds the
spec and constraints.

Phase 1 (site) is complete. Phase 2 (the twin) is not built yet; it needs `OPENROUTER_API_KEY`
in `.env`, read server-side only.
