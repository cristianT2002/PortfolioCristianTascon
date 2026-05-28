import { motion } from 'motion/react';
import { NAV_LINKS } from '../constants';
import logo from '../assets/CLogo.png';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-full">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Cristian<span className="text-blue-400">.Tascón</span>
          </span>
        </div>

        <ul className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-theme-muted hover:text-theme-text hover:bg-theme-hover-bg transition-all duration-300 flex items-center gap-2"
              >
                <link.icon className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:block">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.div whileHover={{ scale: 1.05 }}>
            <a
              href="#contact"
              className="bg-theme-text text-theme-bg px-4 md:px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all duration-300 inline-block"
            >
              <span className="hidden md:inline">Contáctame</span>
              <span className="md:hidden">Contacto</span>
            </a>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
}
