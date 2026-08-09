'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skills = [
  {
    category: 'Languages',
    summary: 'Core programming and web fundamentals',
    items: ['Java', 'C#', 'Python', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'Frameworks',
    summary: 'Frontend and backend application work',
    items: ['React.js', 'Next.js', 'Node.js', 'Express.js'],
  },
  {
    category: 'Data & Cloud',
    summary: 'Persistence, deployment, and service basics',
    items: ['MongoDB', 'SQL',  'AWS', 'Azure','Render', 'Vercel'],
  },
  {
    category: 'Tools',
    summary: 'Daily development and debugging workflow',
    items: ['Git', 'VS Code', 'IntelliJ','Cursor'],
  },
  {
    category: 'Testing & APIs',
    summary: 'API testing and application visibility',
    items: ['Postman', ],
  },
  {
    category: 'Design & Collaboration',
    summary: 'Interface planning and communication',
    items: ['Figma', 'Canva', ],
  },
];

export default function Skills() {
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
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.container}>
        <h2 className={styles.title}>Skills & Technologies</h2>
        <div className={styles.grid}>
          {skills.map((category) => (
            <div key={category.category} className={styles.category}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                <p>{category.summary}</p>
              </div>
              <div className={styles.skillsGrid}>
                {category.items.map((skill) => (
                  <div key={skill} className={styles.skillCard}>
                    <span className={styles.skillName}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
