import { profile } from "@/lib/profile";

export function Hero() {
  return (
    <header className="px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
          <span className="font-medium tracking-wider uppercase">{profile.name}</span>
          <span className="text-rule">/</span>
          <span className="text-muted">{profile.location}</span>
          <span className="inline-flex items-center gap-1.5 border border-accent px-2 py-0.5 text-accent">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Open to work
          </span>
        </div>

        <h1 className="max-w-3xl text-4xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          I studied the brain to understand intelligence.{" "}
          <span className="text-accent">Now I build it.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
          {profile.subline}
        </p>

        <p className="mt-2 max-w-xl text-base text-muted sm:text-lg">
          {profile.role} in {profile.location}. {profile.status}
        </p>

        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:mt-12">
          {[
            ["Projects", "#projects"],
            ["Experience", "#experience"],
            ["Education", "#education"],
            ["Ask my twin", "#twin"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="border-b border-rule pb-0.5 tracking-wide uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
