import { Section } from "./section";
import { profile } from "@/lib/profile";

const links = [
  { label: "LinkedIn", href: profile.linkedin, handle: "in/sonu-yadav-a61046245" },
  { label: "GitHub", href: profile.github, handle: "sy22478" },
];

export function Contact() {
  return (
    <Section id="contact" index="05" title="Contact">
      <p className="max-w-2xl text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
        {profile.status}
      </p>

      <ul className="mt-10 border-t border-rule">
        {links.map((l) => (
          <li key={l.label} className="border-b border-rule">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:bg-panel"
            >
              <span className="text-lg font-medium transition-colors group-hover:text-accent">
                {l.label}
              </span>
              <span className="font-mono text-xs text-muted">{l.handle}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 font-mono text-xs text-muted">
        {profile.name} <span className="text-rule">·</span> {profile.location}
      </p>
    </Section>
  );
}
