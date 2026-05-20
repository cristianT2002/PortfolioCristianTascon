import { motion } from 'motion/react';
import { NAV_LINKS } from '../constants';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <Terminal className="w-5 h-5 text-white" />
          </motion.div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Cristian<span className="text-blue-400">.Dev</span>
          </span>
        </div>

        <ul className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <link.icon className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:block">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
          <a
            href="#contact"
            className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 inline-block"
          >
            Charlemos
          </a>
        </motion.div>
      </nav>
    </motion.header>
  );
}
