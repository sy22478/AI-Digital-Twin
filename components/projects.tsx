import { Section } from "./section";
import { featuredProjects, otherProjects } from "@/lib/profile";

export function Projects() {
  return (
    <Section id="projects" index="01" title="Projects">
      <div className="space-y-px bg-rule">
        {featuredProjects.map((p) => (
          <article key={p.name} className="bg-bg pb-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {p.name}
              </h3>
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-wide text-muted uppercase transition-colors hover:text-accent"
              >
                View code
              </a>
            </div>

            <p className="mt-1 text-base text-accent sm:text-lg">{p.tagline}</p>

            <ul className="mt-5 space-y-2.5">
              {p.points.map((point) => (
                <li
                  key={point}
                  className="border-l border-rule pl-4 text-sm leading-relaxed text-muted sm:text-base"
                >
                  {point}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="border border-rule px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <ul className="mt-12 border-t border-rule">
        {otherProjects.map((p) => (
          <li key={p.name} className="border-b border-rule">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-5 transition-colors hover:bg-panel"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-medium transition-colors group-hover:text-accent">
                  {p.name}
                </h3>
                <span className="font-mono text-[11px] tracking-wide text-muted uppercase">
                  {p.tagline}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                {p.note}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
