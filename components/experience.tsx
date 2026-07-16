import { Section } from "./section";
import { experience } from "@/lib/profile";

export function Experience() {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="border-t border-rule">
        {experience.map((job) => (
          <li
            key={`${job.org}-${job.period}`}
            className="grid gap-x-8 gap-y-2 border-b border-rule py-6 sm:grid-cols-[10rem_1fr]"
          >
            <div className="font-mono text-xs text-muted">
              <div>{job.period}</div>
              {job.current && (
                <div className="mt-1.5 inline-block text-accent">Current</div>
              )}
            </div>

            <div>
              <h3 className="font-medium">{job.role}</h3>
              <p className="mt-0.5 text-sm text-muted">
                {job.org} <span className="text-rule">·</span> {job.meta}
              </p>

              {job.points.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="border-l border-rule pl-4 text-sm leading-relaxed text-muted"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
