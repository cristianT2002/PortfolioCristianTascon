import { TECH_STACK_ROW_1, TECH_STACK_ROW_2 } from '../constants';

function techIconUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

function TechLogoCard({ name, slug, color, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${name} — sitio oficial`}
      aria-label={`${name}, abrir sitio oficial`}
      className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-xl border border-theme-border bg-theme-glass-bg p-4 transition-colors hover:border-blue-500/40 hover:bg-theme-hover-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
    >
      <img
        src={techIconUrl(slug, color)}
        alt=""
        className="h-9 w-9 object-contain pointer-events-none"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

function MarqueeRow({ items, reverse = false }) {
  const loop = [...items, ...items];

  return (
    <div className="tech-marquee-fade overflow-hidden py-2.5">
      <div
        className={`flex w-max gap-4 pl-4 ${reverse ? 'tech-marquee-track-reverse' : 'tech-marquee-track'}`}
      >
        {loop.map((tech, index) => (
          <TechLogoCard key={`${tech.slug}-${index}`} {...tech} />
        ))}
      </div>
    </div>
  );
}

export default function SkillShowcase() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-theme-border-subtle bg-theme-panel-bg py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[880px] w-[400px] max-w-[400px] -translate-x-1/2 -translate-y-24 rotate-24 rounded-[5120px] opacity-45 blur-[64px]"
        style={{
          background: `linear-gradient(to bottom, var(--theme-skill-glow-from), var(--theme-skill-glow-to))`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="max-w-3xl text-3xl font-normal tracking-tight text-theme-skill-heading md:text-5xl md:leading-tight md:tracking-[-0.02em]">
            Stack técnico{' '}
          </h2>
          <p className="max-w-xl text-base leading-6 text-theme-skill-sub">
            Backend, frontend, datos, infraestructura e Inteligencia Artificial.
          </p>
        </div>

        <div className="tech-marquee flex flex-col gap-2">
          <MarqueeRow items={TECH_STACK_ROW_1} />
          <MarqueeRow items={TECH_STACK_ROW_2} reverse />
        </div>
      </div>
    </section>
  );
}
