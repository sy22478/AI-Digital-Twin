import { Section } from "./section";
import { profile } from "@/lib/profile";

// Phase 1 placeholder. The chat UI replaces this body in phase 2; the section
// id and heading stay put so the hero nav link does not move.
export function Twin() {
  return (
    <Section id="twin" index="04" title="Ask my digital twin">
      <div className="max-w-2xl">
        <p className="text-xl leading-snug font-medium tracking-tight text-balance sm:text-2xl">
          Rather than read all of this, ask an AI version of me about it.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          It answers from my actual background, and says so when it does not know
          something rather than guessing. Not live yet.
        </p>

        <div
          className="mt-8 border border-rule bg-panel p-4"
          aria-label="Digital twin chat, not yet available"
        >
          <div className="flex items-center justify-between font-mono text-[11px] tracking-wide text-muted uppercase">
            <span>Twin</span>
            <span className="text-accent">Coming soon</span>
          </div>
          <div className="mt-3 border-t border-rule pt-3 font-mono text-xs text-muted">
            <p>&gt; What did you actually build in HealthMate?</p>
            <p className="mt-2 text-rule">&gt; _</p>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-muted">
          In the meantime,{" "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            ask me directly
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
