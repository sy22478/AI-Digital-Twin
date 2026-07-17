# AI Digital Twin — Sonu Yadav

## What this is

A personal portfolio site with an AI "digital twin": a chat interface where a visitor can
interrogate an AI version of me about my career, grounded in my real background.

**Who it is for:** technical recruiters, hiring managers, and engineers evaluating me for AI/ML
and AI engineering roles. Assume the visitor has 30 seconds, is on a phone, and has already seen
fifty portfolio sites this week. The site's job is to make them stay, then make them contact me.

**Source of truth:** `LinkedIn.md` in the project root. Every factual claim on this site must
trace back to it. Do not invent employers, dates, metrics, or achievements. If something is not
in `LinkedIn.md`, leave it out — or ask me. A digital twin built on guessed history is worse than
no page at all.

**Do not invent meaning either.** This rule exists because it was broken. The prohibition above
covers facts; it applies equally to motivations, reasons, opinions, intent, and narrative. Do not
explain why I did something unless `LinkedIn.md` says why. Do not characterise my career as a plan,
a journey, or a thesis unless `LinkedIn.md` characterises it that way. Never attribute words or
beliefs to me with phrases like "in his own words" unless you are quoting `LinkedIn.md` directly.
If there is a hole in the narrative, leave the hole. Do not fill silence with something plausible.

## Build order

Two phases, with a git commit between them.

1. **Website only.** No AI, no API calls. Confirm it runs and looks right.
2. **The digital twin chat.** Only after phase 1 is committed and working.

Do not start phase 2 until I say so.

## Phase 1 — the website

Sections, in this order:

- **Hero.** Name, what I do, where I am, and that I'm open to work. One line that isn't a cliché.
- **Projects.** Lead with these, not with job titles. My strongest evidence is in what I've built:
  HealthMate (agentic healthcare assistant), Resume Tailor (RAG agent), ReneWind (deep learning
  predictive maintenance), Personal Loan Campaign, EasyVisa, FoodHub, Restaurant Turnover.
  Prioritise the AI/agent ones. Real metrics where `LinkedIn.md` has them.
- **Experience.** Current role first.
- **Education and certifications.** Compact. Three master's-level programs plus 8 certifications
  is a lot of surface area — summarise, don't dump.
- **Digital twin chat.** A placeholder section in phase 1, wired up in phase 2.
- **Contact.** LinkedIn and GitHub links.

## Phase 2 — the digital twin

- Chat UI in the section reserved in phase 1.
- The API call goes through a **Next.js API route, server side only**, reading
  `process.env.OPENROUTER_API_KEY`. Never a client-side fetch. The key must never reach the
  browser, never appear in code, never be logged.
- Provider: **OpenRouter**. I will give you the exact model slug — ask me, do not guess.
- The **entire contents of `LinkedIn.md`** go into the system prompt so answers are specific
  rather than vague.
- The twin answers in **first person as me**, always, professional and direct. This holds even when
  the visitor phrases their question in the third person ("What did Sonu do at Natera?"). Answer as
  "I", never as "he". Do not mirror the questioner's framing.
- **The twin must not invent.** If asked something not covered by `LinkedIn.md`, it says it
  doesn't have that detail and points to my LinkedIn. This is a hiring context — a hallucinated
  claim about my experience is a serious failure, not a cosmetic one.
- No database. Conversation state in memory for the session.

## Technical

- **Next.js** (latest stable), **App Router**, **TypeScript**, **Tailwind**.
- Runs locally with `npm run dev`. Target deployment is **Netlify**, not Vercel. Use the Netlify
  Next.js runtime. The `/api/twin` route must work as a Netlify function.
- `OPENROUTER_API_KEY` is set as an environment variable in the Netlify dashboard. It is never
  committed and never bundled into client-side code.
- No auth, no database, no CMS.

## Contact rules

I want recruiters to reach me, but this repo is public and scraped.

- Link to LinkedIn and GitHub. Those are already public and are the right front door.
- Do not put a raw email address or phone number in the page source or in `LinkedIn.md`.
- If you think a contact form is worth it, ask me first — it needs a backend and I'd rather not
  add one for phase 1.

## Design

- Style: sharp, fast, confident. Enterprise meets edgy.
- **Avoid the default LLM portfolio look**: no purple gradient hero, no three-icon feature row,
  no glassmorphism cards, no generic "Let's build something amazing together" copy. If it looks
  like every other AI-generated site, it has failed — recruiters have seen it and it reads as
  low-effort.
- Mobile-first. Most recruiters open links on a phone.
- Fast. No heavy animation libraries.

## Coding standards

- Latest versions and idiomatic approaches as of today.
- Keep it simple. Never over-engineer. No unnecessary defensive programming.
- No extra features I did not ask for.
- Short, focused modules over one large file.
- Be concise. Keep the README minimal.
- IMPORTANT: no emojis, ever — code, comments, UI copy, commit messages, or logs.

## Debugging

- Identify the root cause before fixing. Do not guess.
- Reproduce consistently, prove the root cause with evidence, fix, then demonstrate it is fixed.
- No workarounds or band-aids.
- Never claim something is fixed without showing evidence.

## Working with me

- Ask questions before you start work, not after.
- Tell me when you disagree with something in this file. I would rather argue than get compliance.
- When I make a decision worth remembering, I log it in `DECISIONS.md` via the `/log` command.

## Success criteria

Phase 1:
- [ ] `npm run dev` starts clean — no errors, no Next.js overlay warnings.
- [ ] Every section renders; responsive down to 375px.
- [ ] Every factual claim traces to `LinkedIn.md`.
- [ ] Nothing about it looks LLM-generated.
- [ ] All links work.

Phase 2:
- [ ] The twin answers a specific career question correctly, citing real detail.
- [ ] Asked something outside `LinkedIn.md`, it declines instead of inventing.
- [ ] Asked *why* I did something not explained in `LinkedIn.md`, it declines rather than
      constructing a motivation.
- [ ] It answers in first person even when the question is phrased in third person.
- [ ] No API key in client-side code, in the repo, or in git history.
- [ ] Deployed to Netlify with the API key set in the Netlify dashboard, and the twin works in
      production, not just locally.
- [ ] Reachable and usable from a phone.
