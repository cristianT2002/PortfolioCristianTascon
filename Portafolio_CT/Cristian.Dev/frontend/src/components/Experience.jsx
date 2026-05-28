import { motion } from 'motion/react';
import { CAREER, PROJECTS } from '../constants';
import { ArrowUpRight, Briefcase, Building2 } from 'lucide-react';

function scrollToProject(projectId) {
  const el = document.getElementById(`project-${projectId}`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          Experiencia
        </div>
        <h2 className="text-4xl font-bold mb-4">¿Dónde he construido impacto?</h2>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Más de 3 años de experiencia en el desarrollo de software. Este es el hilo de mi recorrido;
          el detalle técnico y el impacto están en cada proyecto.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="space-y-12"
        >
          {CAREER.map((org) => (
            <motion.div
              key={org.id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="relative pl-14"
            >
              <div className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>

              <div className="glass rounded-[2rem] p-8 hover:border-blue-500/20 transition-colors">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap items-baseline justify-between gap-2 mb-3"
                >
                  <div>
                    <h3 className="text-2xl font-bold">{org.company}</h3>
                    {org.location && (
                      <p className="text-xs text-gray-500 mt-0.5">{org.location}</p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    {org.period}
                  </span>
                </motion.div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{org.summary}</p>

                <div className="space-y-4">
                  {org.roles.map((role) => {
                    const linkedProjects = PROJECTS.filter((p) =>
                      role.projectIds.includes(p.id)
                    );

                    return (
                      <div
                        key={`${org.id}-${role.title}`}
                        className="rounded-2xl bg-white/[0.02] border border-white/5 p-5"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className="flex flex-wrap items-center justify-between gap-2 mb-3"
                        >
                          <p className="font-semibold text-white">{role.title}</p>
                          <span className="text-xs text-gray-500 font-medium">{role.period}</span>
                        </motion.div>

                        {role.narrative && (
                          <p className="text-xs text-gray-500 leading-relaxed mb-3">
                            {role.narrative}
                          </p>
                        )}

                        {linkedProjects.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {linkedProjects.map((project) => (
                              <motion.button
                                key={project.id}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => scrollToProject(project.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium hover:bg-blue-500/20 transition-colors cursor-pointer"
                              >
                                {project.title}
                                <ArrowUpRight className="w-3 h-3" />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
