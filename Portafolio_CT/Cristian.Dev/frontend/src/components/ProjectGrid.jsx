import { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, PROFILE } from '../constants';
import profileImg from '../assets/profile.png';
import {
  BadgeCheck,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Heart,
  Layers,
  MessageCircle,
  Send,
} from 'lucide-react';

function getAllStack(stack) {
  return [...(stack.frontend ?? []), ...(stack.backend ?? []), ...(stack.infra ?? [])];
}

function getProjectImages(project) {
  if (project.images?.length) return project.images;
  if (project.image) return [project.image];
  return [];
}

function ClientAvatar({ client, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';

  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        className={`${sizeClass} rounded-full object-cover border border-white/10 shrink-0`}
      />
    );
  }

  const initials = client.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      className={`${sizeClass} rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-white border border-white/10 shrink-0`}
      aria-hidden
    >
      {initials}
    </motion.div>
  );
}

function PostImageCarousel({ images, title, postBadge, achievements }) {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const count = images.length;

  const scrollTo = useCallback(
    (index) => {
      const el = scrollRef.current;
      if (!el || count === 0) return;
      const next = ((index % count) + count) % count;
      el.scrollTo({ left: el.clientWidth * next, behavior: 'smooth' });
      setActive(next);
    },
    [count]
  );

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active) setActive(index);
  }, [active, count]);

  if (count === 0) {
    return <div className="absolute inset-0 bg-[#111]" aria-hidden />;
  }

  return (
    <motion.div className="absolute inset-0 bg-black">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide touch-pan-x"
        aria-label={`Galería de ${title}`}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative h-full w-full shrink-0 snap-center snap-always"
          >
            <img
              src={src}
              alt={`${title} — imagen ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-[11px] font-bold text-emerald-300 border border-emerald-500/30 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {postBadge}
      </span>

      {count > 1 && (
        <>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-white/90 hover:text-white opacity-0 group-hover/carousel:opacity-100 sm:opacity-100 transition-opacity"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass flex items-center justify-center text-white/90 hover:text-white opacity-0 group-hover/carousel:opacity-100 sm:opacity-100 transition-opacity"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:flex gap-2 pointer-events-none">
        {achievements.map((item) => (
          <div
            key={item.label}
            className="flex-1 min-w-0 glass px-2.5 py-2 rounded-xl text-center"
          >
            <p className="text-sm font-bold text-blue-300 truncate">{item.value}</p>
            <p className="text-[9px] text-gray-400 leading-tight line-clamp-2">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function InstagramPost({ project }) {
  const techStack = getAllStack(project.stack);
  const handle = PROFILE.instagramHandle;
  const images = getProjectImages(project);

  return (
    <motion.article
      id={`project-${project.id}`}
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
      }}
      className="w-full glass rounded-[2rem] overflow-hidden scroll-mt-28 border border-white/10 shadow-2xl shadow-black/40"
    >
      <motion.div
        whileHover={{ y: -2 }}
        className="grid lg:grid-cols-2 lg:min-h-[min(640px,78vh)] bg-[#0a0a0a]"
      >
        {/* Carrusel a ancho completo de la columna */}
        <div className="relative w-full aspect-square lg:aspect-auto lg:min-h-[min(640px,78vh)] group/carousel">
          <PostImageCarousel
            images={images}
            title={project.title}
            postBadge={project.postBadge}
            achievements={project.achievements}
          />
        </div>

        {/* Panel estilo Instagram */}
        <div className="flex flex-col min-h-[420px] lg:min-h-0 lg:max-h-[min(640px,78vh)] border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 min-w-0"
            >
              <img
                src={profileImg}
                alt={PROFILE.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="flex items-center gap-1 text-sm font-semibold truncate">
                  {handle}
                  <BadgeCheck className="w-4 h-4 text-blue-400 shrink-0" aria-label="Verificado" />
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {PROFILE.location} · {project.role}
                </p>
              </div>
            </motion.div>
            <div className="flex items-center gap-1 shrink-0">
              <motion.a
                whileHover={{ scale: 1.08 }}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Ver en GitHub"
              >
                <Code2 className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.08 }}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Ver proyecto"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
            <div className="text-sm leading-relaxed">
              <p>
                <span className="font-semibold mr-1.5">{handle}</span>
                <span className="text-gray-200">
                  💡 <strong className="text-white">{project.title}</strong>
                  {' — '}
                  {project.description}
                </span>
              </p>
              <p className="mt-2 text-blue-400/90 text-xs leading-relaxed">
                {project.hashtags.join(' ')}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 space-y-3">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Especificaciones técnicas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/25 text-[11px] font-medium text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="space-y-1.5">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                    <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-gray-600 pt-1 border-t border-white/5">
                {project.company} · {project.period} · {project.sector}
              </p>
            </div>
          </div>

          <motion.div className="px-4 py-3 border-t border-white/10 shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-rose-400 transition-colors"
                  aria-label="Me gusta"
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Comentarios"
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.button>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Compartir"
                >
                  <Send className="w-6 h-6 -rotate-12" />
                </motion.a>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Guardar"
              >
                <Bookmark className="w-6 h-6" />
              </motion.button>
            </div>

            <p className="text-sm font-semibold">{project.likes.toLocaleString('es-CO')} Me gusta</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              {project.views.toLocaleString('es-CO')} reproducciones · {project.postedAgo}
            </p>
          </motion.div>

          <div className="px-4 py-3 border-t border-white/10 shrink-0 bg-white/[0.02]">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
              Clientes del proyecto
            </p>
            <div className="space-y-3 max-h-36 overflow-y-auto scrollbar-hide">
              {project.clients.map((client) => (
                <motion.div
                  key={client.handle}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2.5"
                >
                  <ClientAvatar client={client} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-snug">
                      <span className="font-semibold text-white mr-1">{client.handle}</span>
                      <span className="text-gray-400">{client.comment}</span>
                    </p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{client.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <img
                src={profileImg}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-white/10 shrink-0"
              />
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <motion.div className="flex -space-x-1.5 shrink-0">
                  {project.clients.map((client) => (
                    <ClientAvatar key={client.handle} client={client} size="sm" />
                  ))}
                </motion.div>
                <span className="text-xs text-gray-600 truncate">
                  {project.clients.length} cliente{project.clients.length !== 1 ? 's' : ''} ·{' '}
                  {project.client}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ProjectGrid() {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Feed de proyectos
          </div>
          <h2 className="text-4xl font-bold mb-4">Publicaciones con impacto real</h2>
          <p className="text-gray-400 max-w-xl">
            Cada proyecto como un post de Instagram: desliza las capturas, contexto, stack y
            clientes en los comentarios.
          </p>
        </motion.div>
        <motion.a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="text-blue-400 font-medium flex items-center gap-2 hover:text-blue-300 transition-colors shrink-0"
        >
          Ver todo en GitHub <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
        className="space-y-10"
      >
        {PROJECTS.map((project) => (
          <InstagramPost key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
