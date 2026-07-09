'use client';

import { useEffect, useRef } from 'react';
import { FaCodeBranch, FaLightbulb, FaUsers } from 'react-icons/fa';
import styles from './About.module.css';

const values = [
  {
    title: 'Build with purpose',
    description: 'I like projects that solve a clear problem, keep the user in mind, and turn scattered ideas into something people can actually use.',
    icon: FaLightbulb,
  },
  {
    title: 'Write understandable code',
    description: 'Lab and peer-support work taught me to value code that another person can read, debug, and improve without guessing the intent.',
    icon: FaCodeBranch,
  },
  {
    title: 'Communicate clearly',
    description: 'Whether I am learning a new stack or helping someone through a bug, I try to explain tradeoffs and keep the work moving.',
    icon: FaUsers,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.kicker}>About</p>
          <h2 className={styles.title}>A builder learning by shipping.</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.story}>
            <h3>My Journey</h3>
            <p>
              I&apos;m a Computer Science student and hands-on builder who got into software engineering because I liked turning ideas into real products.
              I started with programming fundamentals and problem solving, then became more interested in designing features, debugging, and improving user experience.
            </p>
            <p>
              As I took more CS courses and worked on projects, I found myself drawn to full-stack development and Android applications that solve practical problems.
              Teaching and supporting other students through lab and TA-style work also helped me care more about clean code, teamwork, and clear explanations.
            </p>
          </div>

          <div className={styles.snapshot}>
            <span>Currently focused on</span>
            <strong>Full-stack projects, backend fundamentals, mobile development, and writing code that is easy to maintain.</strong>
          </div>
        </div>

        <div className={styles.valueGrid}>
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article key={value.title} className={styles.value}>
                <Icon className={styles.valueIcon} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
