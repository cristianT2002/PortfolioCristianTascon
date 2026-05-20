import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import SkillShowcase from './components/SkillShowcase';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProjectGrid />
        <Experience />
        <SkillShowcase />
        <Contact />
      </main>
    </div>
  );
}
