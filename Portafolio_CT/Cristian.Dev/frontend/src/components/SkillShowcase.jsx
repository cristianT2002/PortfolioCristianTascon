import { motion } from 'motion/react';
import { SKILLS } from '../constants';

export default function SkillShowcase() {
  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Herramientas y tecnologías que utilizo para dar vida a proyectos innovadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl glass hover:border-blue-500/50 transition-colors"
            >
              <motion.div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <category.icon className="w-6 h-6 text-blue-400" />
              </motion.div>
              <h3 className="text-xl font-bold mb-6">{category.name}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-400 group">
                    <motion.div
                      whileHover={{ width: 8 }}
                      className="w-1 h-1 rounded-full bg-blue-500/50 transition-all group-hover:w-2"
                    />
                    <span className="text-sm font-medium group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
