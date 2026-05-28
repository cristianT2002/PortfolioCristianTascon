import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import SkillShowcase from './components/SkillShowcase';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <ProjectGrid />
        <SkillShowcase />
        <Contact />
      </main>
    </div>
  );
}
