type Props = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, children }: Props) {
  return (
    <section id={id} className="border-t border-rule px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-baseline gap-3 sm:mb-12">
          <span className="font-mono text-xs text-accent">{index}</span>
          <h2 className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
