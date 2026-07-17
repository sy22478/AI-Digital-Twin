# Decision log — AI Digital Twin

A running record of what I decided, what I rejected, what broke, and what surprised me
while building this with Claude Code.

Tags: `DECISION` (a choice I made) · `REJECTED` (something the model proposed that I turned
down) · `BUG` (what broke, root cause, fix) · `SURPRISE` (something I didn't expect).

Append entries at the bottom. Keep them to two or three lines. Write them knowing this file
is public.

---

## 2026-07-16

**DECISION — Claude Code only, no Cursor or Codex.**
The course demos this project in Cursor on YOLO mode. I'm doing every project in Claude Code
instead, so I go deep on one tool rather than shallow on four. Trade-off: I lose the
cross-model code review step (Opus reviewing Codex's work), so I'll approximate it by
reviewing in a fresh context with a different model.

**DECISION — Wrote `claude.md` by hand instead of running `/init`.**
`/init` has Claude analyse the repo and write its own instructions. Ed's advice is that this
is the one file the human should own, since it's the spec, the style guide, and the
definition of done all at once. Writing it myself forced me to decide what "done" means
before the model started guessing.

**DECISION — Website first, AI chat second. Not one-shot.**
The course YOLOs this project in a single prompt. I split it into two phases with a git
commit between them, so if the AI integration goes wrong I can roll back to a working site
rather than untangling both at once.

**DECISION — Repo is public, so `.env` is gitignored before the first commit.**
The OpenRouter key never enters the codebase. The LLM call goes through a server-side
Next.js API route reading `process.env`, never a client-side fetch. OpenRouter's own sample
code hardcodes the key inline — that sample is the exact pattern that leaks keys.

**BUG — Claude Code was running one directory above the git repo.**
Cloned to `F:\AI Digital Twin\AI-Digital-Twin` while Claude Code's working directory was the
parent, `F:\AI Digital Twin`. It was about to scaffold outside the repo, and `claude.md`
wouldn't have loaded, since Claude Code reads it from the project root. Caught it before
answering its question. Fix: exit, `cd` into the repo, relaunch. Lesson: check the working
directory in the Claude Code header before you give it any real work.

---

## Entry template

Copy this, don't overthink it:

**TAG — one-line summary.**
Two lines of why. What I chose, what I turned down, or what broke and what the root cause
turned out to be.
