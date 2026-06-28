import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import PortfolioIntroGate from '@/components/PortfolioIntroGate';
import styles from './page.module.css';

export default function Home() {
  return (
    <PortfolioIntroGate>
      <main className={styles.main}>
        <Navbar />
        <Profile />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </PortfolioIntroGate>
  );
}
