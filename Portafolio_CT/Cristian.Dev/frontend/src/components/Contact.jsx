import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import { PROFILE } from '../constants';

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        <div>
          <h2 className="text-4xl font-bold mb-6">¿Tienes un proyecto en mente?</h2>
          <p className="text-gray-400 text-lg mb-12">
            Estoy abierto a colaborar en proyectos interesantes y desafiantes. Escríbeme y
            construyamos algo con impacto medible.
          </p>

          <div className="space-y-6">
            <motion.a
              href={`mailto:${PROFILE.email}`}
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <motion.div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</p>
                <p className="text-white font-medium">{PROFILE.email}</p>
              </motion.div>
            </motion.a>

            <motion.a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  LinkedIn
                </p>
                <p className="text-white font-medium">linkedin.com/in/cristiantasconm</p>
              </div>
            </motion.a>

            <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center">
                <MapPin className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Ubicación
                </p>
                <p className="text-white font-medium">{PROFILE.location} | Remoto</p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-[2rem] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

          <form
            className="space-y-6 relative z-10"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const name = form.nombre.value;
              const email = form.email.value;
              const subject = form.asunto.value;
              const body = form.mensaje.value;
              window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${body}`)}`;
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                <label
                  htmlFor="nombre"
                  className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </motion.div>
              <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </motion.div>
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
              <label
                htmlFor="asunto"
                className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1"
              >
                Asunto
              </label>
              <input
                id="asunto"
                name="asunto"
                type="text"
                placeholder="Colaboración / Freelance"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.01 }} className="space-y-2">
              <label
                htmlFor="mensaje"
                className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Cuéntame sobre tu proyecto..."
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group"
            >
              Enviar Mensaje
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm italic">
          &copy; {new Date().getFullYear()} Cristian.Dev. Ingeniero Electrónico · USB Bogotá 2024.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest"
        >
          <motion.a
            whileHover={{ y: -2 }}
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
