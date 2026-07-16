import { Section } from "./section";
import { education, certifications, certificationsTotal, skills } from "@/lib/profile";

export function Education() {
  return (
    <Section id="education" index="03" title="Education and certifications">
      <ol className="border-t border-rule">
        {education.map((e) => (
          <li
            key={e.school + e.period}
            className="grid gap-x-8 gap-y-1 border-b border-rule py-4 sm:grid-cols-[10rem_1fr]"
          >
            <div className="font-mono text-xs text-muted">{e.period}</div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <div>
                <h3 className="text-sm font-medium">{e.award}</h3>
                <p className="mt-0.5 text-sm text-muted">{e.school}</p>
              </div>
              {"grade" in e && (
                <span className="font-mono text-xs text-muted">GPA {e.grade}</span>
              )}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            Certifications
          </h3>
          <ul className="mt-4 space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="text-sm">
                <span className="font-medium">{c.name}</span>
                <span className="block text-muted">
                  {c.issuer} <span className="text-rule">·</span> {c.year}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-muted">
            {certificationsTotal} in total. The rest are on LinkedIn.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            Skills
          </h3>
          <ul className="mt-4 space-y-3">
            {skills.map((s) => (
              <li key={s.group} className="text-sm">
                <span className="font-medium">{s.group}</span>
                <span className="mt-0.5 block leading-relaxed text-muted">
                  {s.items}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
