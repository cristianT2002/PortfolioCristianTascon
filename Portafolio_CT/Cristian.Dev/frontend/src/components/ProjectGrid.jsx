import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRIVATE_REPO_TOOLTIP, PROJECTS, PROFILE } from '../constants';
import { GitHubIcon } from './SocialIcons';
import { fetchEngagement, postProjectComment, toggleProjectLike } from '../api';
import profileImg from '../assets/FotoPerfil.png';
import {
  BadgeCheck,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  Layers,
  MessageCircle,
  Send,
} from 'lucide-react';

function getAllStack(stack) {
  return [...(stack.frontend ?? []), ...(stack.backend ?? []), ...(stack.infra ?? [])];
}

function normalizeProjectImage(image) {
  if (typeof image === 'string') {
    return { src: image, fit: 'contain', objectPosition: 'center', padding: 'default' };
  }

  return {
    src: image.src,
    fit: image.fit ?? 'contain',
    objectPosition: image.objectPosition ?? 'center',
    padding: image.padding ?? 'default',
  };
}

function getProjectImages(project) {
  const raw = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];

  return raw.map(normalizeProjectImage);
}

const IMAGE_PADDING = {
  none: 'p-0',
  tight: 'p-1 sm:p-2',
  default: 'p-3 sm:p-5',
};

function ClientAvatar({ client, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';

  if (client.logo) {
    const isDarkLogo = client.logoBg === 'black';

    return (
      <img
        src={client.logo}
        alt={client.name}
        className={`${sizeClass} object-contain shrink-0 ${
          isDarkLogo
            ? 'rounded-full bg-black p-1 border border-white/15'
            : 'rounded-2xl bg-white p-0.5 border border-white/10'
        }`}
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

function PostImageCarousel({ images, title, postBadge }) {
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
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className={`relative flex h-full w-full shrink-0 snap-center snap-always items-center justify-center overflow-hidden bg-[#0a0a0a] ${IMAGE_PADDING[image.padding] ?? IMAGE_PADDING.default}`}
          >
            <img
              src={image.src}
              alt={`${title} — imagen ${index + 1}`}
              className={
                image.fit === 'cover'
                  ? 'h-full w-full object-cover drop-shadow-lg'
                  : 'max-h-full max-w-full object-contain object-center drop-shadow-lg'
              }
              style={{ objectPosition: image.objectPosition }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

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

    </motion.div>
  );
}

const LIKES_STORAGE_KEY = 'portfolio-liked-projects';

function getStoredLikes() {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredLike(projectId, liked) {
  const current = new Set(getStoredLikes());
  if (liked) {
    current.add(projectId);
  } else {
    current.delete(projectId);
  }
  localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([...current]));
}

function formatCommentDate(isoDate) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function InstagramPost({ project, engagement, onEngagementChange }) {
  const techStack = getAllStack(project.stack);
  const handle = PROFILE.instagramHandle;
  const images = getProjectImages(project);

  const likes = engagement?.likes ?? project.likes;
  const comments = engagement?.comments ?? [];

  const [isLiked, setIsLiked] = useState(() => getStoredLikes().includes(project.id));
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentFeedback, setCommentFeedback] = useState('');
  const commentInputRef = useRef(null);

  const handleToggleLike = async () => {
    if (isLikeLoading) return;

    const nextLiked = !isLiked;
    const action = nextLiked ? 'like' : 'unlike';

    setIsLikeLoading(true);

    try {
      const data = await toggleProjectLike(project.id, action);
      setIsLiked(nextLiked);
      setStoredLike(project.id, nextLiked);
      onEngagementChange(project.id, {
        likes: data.likes,
        comments: data.comments,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const openComments = () => {
    setIsCommentsOpen(true);
    setTimeout(() => commentInputRef.current?.focus(), 120);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    if (isCommentLoading) return;

    const author = commentAuthor.trim();
    const text = commentText.trim();

    if (!author || !text) {
      setCommentFeedback('Escribe tu nombre y comentario.');
      return;
    }

    setIsCommentLoading(true);
    setCommentFeedback('');

    try {
      const data = await postProjectComment(project.id, author, text);
      onEngagementChange(project.id, {
        likes: data.likes,
        comments: data.comments,
      });
      setCommentText('');
      setIsCommentsOpen(true);
      setCommentFeedback('Comentario publicado.');
    } catch (error) {
      setCommentFeedback(error.message || 'No se pudo publicar el comentario.');
    } finally {
      setIsCommentLoading(false);
    }
  };

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
              {project.github && (
                <div className="relative group">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.08 }}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-default"
                    aria-label={PRIVATE_REPO_TOOLTIP}
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </motion.button>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute right-0 top-full z-20 mt-1.5 w-52 rounded-lg border border-white/10 bg-[#1a1a1a] px-3 py-2 text-center text-[11px] leading-snug text-gray-200 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100"
                  >
                    {PRIVATE_REPO_TOOLTIP}
                  </span>
                </div>
              )}
              {project.link && (
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
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
            <div className="text-sm leading-relaxed">
              <p className="text-gray-200">
                <strong className="text-white">{project.title}</strong>
                {' — '}
                {project.description}
              </p>
              <p className="mt-2 text-blue-400/90 text-xs leading-relaxed">
                {project.hashtags.join(' ')}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Tecnologías
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
              </div>

              <div className="space-y-2 pt-1 border-t border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Logros
                </p>
                <ul className="space-y-1.5">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
                      <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-1">
                  {project.achievements.map((item) => (
                    <div
                      key={item.label}
                      className="flex-1 min-w-0 rounded-xl bg-white/[0.04] border border-white/10 px-2 py-2 text-center"
                    >
                      <p className="text-sm font-bold text-blue-300 truncate">{item.value}</p>
                      <p className="text-[9px] text-gray-500 leading-tight line-clamp-2">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {project.challenges?.length > 0 && (
                <div className="space-y-2 pt-1 border-t border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Retos superados
                  </p>
                  <ul className="space-y-1.5">
                    {project.challenges.map((item) => (
                      <li key={item} className="flex gap-2 text-xs text-gray-500 leading-relaxed">
                        <span className="text-blue-400/80 shrink-0 mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
                  disabled={isLikeLoading}
                  onClick={handleToggleLike}
                  className={`transition-colors ${
                    isLiked ? 'text-rose-500' : 'text-gray-300 hover:text-rose-400'
                  }`}
                  aria-label={isLiked ? 'Quitar me gusta' : 'Me gusta'}
                  aria-pressed={isLiked}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => (isCommentsOpen ? setIsCommentsOpen(false) : openComments())}
                  className={`transition-colors ${
                    isCommentsOpen ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  aria-label="Comentarios"
                  aria-expanded={isCommentsOpen}
                >
                  <MessageCircle className={`w-6 h-6 ${isCommentsOpen ? 'fill-white/20' : ''}`} />
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

            <p className="text-sm font-semibold">
              {likes.toLocaleString('es-CO')} Me gusta
              {comments.length > 0 ? (
                <span className="text-gray-500 font-normal">
                  {' '}
                  · {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
                </span>
              ) : null}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              {project.views.toLocaleString('es-CO')} reproducciones · {project.postedAgo}
            </p>

            <AnimatePresence>
              {isCommentsOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="max-h-44 overflow-y-auto space-y-3 scrollbar-hide pr-1">
                      {comments.length > 0 ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                              {comment.author.slice(0, 1).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs leading-snug">
                                <span className="font-semibold text-white mr-1.5">
                                  {comment.author}
                                </span>
                                <span className="text-gray-300">{comment.text}</span>
                              </p>
                              <p className="text-[10px] text-gray-600 mt-1">
                                {formatCommentDate(comment.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500">
                          Sé el primero en comentar este proyecto.
                        </p>
                      )}
                    </div>

                    <form onSubmit={handleSubmitComment} className="space-y-2">
                      <input
                        type="text"
                        value={commentAuthor}
                        onChange={(event) => setCommentAuthor(event.target.value)}
                        placeholder="Tu nombre"
                        maxLength={60}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500/50"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          ref={commentInputRef}
                          type="text"
                          value={commentText}
                          onChange={(event) => setCommentText(event.target.value)}
                          placeholder="Escribe un comentario..."
                          maxLength={500}
                          className="flex-1 bg-transparent border-none text-sm placeholder:text-gray-600 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={isCommentLoading || !commentText.trim() || !commentAuthor.trim()}
                          className="text-xs font-semibold text-blue-400 disabled:text-gray-600 hover:text-blue-300 transition-colors shrink-0"
                        >
                          {isCommentLoading ? '...' : 'Publicar'}
                        </button>
                      </div>
                      {commentFeedback ? (
                        <p className="text-[11px] text-gray-500">{commentFeedback}</p>
                      ) : null}
                    </form>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>

          <div className="px-4 py-3 border-t border-white/10 shrink-0 bg-white/[0.02]">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
              {project.clientsSectionTitle ?? 'Clientes del proyecto'}
            </p>
            {project.clients.length > 0 ? (
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
            ) : (
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.clientsEmptyMessage}
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <img
                src={profileImg}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-white/10 shrink-0"
              />
              <div className="flex-1 flex items-center gap-2 min-w-0">
                {project.clients.length > 0 && (
                  <motion.div className="flex -space-x-1.5 shrink-0">
                    {project.clients.map((client) => (
                      <ClientAvatar key={client.handle} client={client} size="sm" />
                    ))}
                  </motion.div>
                )}
                <span className="text-xs text-gray-600 truncate">
                  {project.clients.length > 0
                    ? `${project.clients.length} ${
                        project.clientsSectionTitle === 'Institución académica'
                          ? project.clients.length === 1
                            ? 'institución'
                            : 'instituciones'
                          : project.clients.length === 1
                            ? 'cliente'
                            : 'clientes'
                      } · `
                    : ''}
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
  const [engagement, setEngagement] = useState({});

  useEffect(() => {
    fetchEngagement()
      .then(setEngagement)
      .catch((error) => console.error(error));
  }, []);

  const handleEngagementChange = useCallback((projectId, patch) => {
    setEngagement((prev) => ({
      ...prev,
      [projectId]: {
        likes: patch.likes ?? prev[projectId]?.likes ?? 0,
        comments: patch.comments ?? prev[projectId]?.comments ?? [],
      },
    }));
  }, []);

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
          <h2 className="text-4xl font-bold mb-4">Proyectos</h2>
        </motion.div>
        <motion.a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="text-blue-400 font-medium flex items-center gap-2 hover:text-blue-300 transition-colors shrink-0"
        >
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
          <InstagramPost
            key={project.id}
            project={project}
            engagement={engagement[project.id]}
            onEngagementChange={handleEngagementChange}
          />
        ))}
      </motion.div>
    </section>
  );
}
