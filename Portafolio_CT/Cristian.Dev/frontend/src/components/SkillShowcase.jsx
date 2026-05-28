import { TECH_STACK_ROW_1, TECH_STACK_ROW_2 } from '../constants';

function techIconUrl(slug, color) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

function TechLogoCard({ name, slug, color }) {
  return (
    <div
      className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
      title={name}
    >
      <img
        src={techIconUrl(slug, color)}
        alt={name}
        className="h-9 w-9 object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
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
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[880px] w-[400px] max-w-[400px] -translate-x-1/2 -translate-y-24 rotate-24 rounded-[5120px] bg-gradient-to-b from-black/25 to-[#191c4d] opacity-45 blur-[64px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
          <h2 className="max-w-3xl text-3xl font-normal tracking-tight text-[#b6b5b9] md:text-5xl md:leading-tight md:tracking-[-0.02em]">
            Stack técnico{' '}
          </h2>
          <p className="max-w-xl text-base leading-6 text-[#d1cece]">
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
