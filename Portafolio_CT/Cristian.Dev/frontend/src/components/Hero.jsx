import { motion } from "motion/react";
import { ArrowRight, FileDown } from "lucide-react";
import { PROFILE } from "../constants";
import profileImg from "../assets/profile.png";
import { GitHubIcon, GitLabIcon, LinkedInIcon } from "./SocialIcons";

const SOCIAL_LINKS = [
  {
    Icon: LinkedInIcon,
    href: PROFILE.linkedin,
    label: "LinkedIn",
    external: true,
  },
  { Icon: GitHubIcon, href: PROFILE.github, label: "GitHub", external: true },
  { Icon: GitLabIcon, href: PROFILE.gitlab, label: "GitLab", external: true },
  {
    Icon: FileDown,
    href: PROFILE.cv,
    label: "Descargar CV",
    download: PROFILE.cvFileName,
    external: false,
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 z-10 py-12"
      >
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Disponible para nuevos retos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Transformo{" "}
            <span className="text-gradient">datos en decisiones </span> con{" "}
            arquitecturas backend e Inteligencia Artificial.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-theme-muted mb-12 max-w-2xl mx-auto lg:mx-0"
          >
            {PROFILE.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all group"
            >
              Ver proyectos
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              {SOCIAL_LINKS.map(({ Icon, href, label, download, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  {...(download ? { download } : {})}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="group w-14 h-14 rounded-2xl border border-theme-border flex items-center justify-center hover:bg-theme-hover-bg transition-all text-theme-muted hover:text-theme-text"
                  aria-label={label}
                  title={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-[3rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 blur-xl" />
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative w-64 h-80 md:w-80 md:h-[420px] flex items-end justify-center"
          >
            <img
              src={profileImg}
              alt={PROFILE.name}
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: "58% bottom" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 w-64 md:w-80 text-center"
          >
            <p className="text-theme-text font-bold text-xl">{PROFILE.name}</p>
            <p className="text-blue-400 text-sm font-medium">{PROFILE.title}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
