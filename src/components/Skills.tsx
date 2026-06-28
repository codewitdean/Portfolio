'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skills = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'Java', icon: '☕' },
      { name: 'C#', icon: '🎯' },
      { name: 'Python', icon: '🐍' },
      { name: 'HTML/CSS', icon: '🌐' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'ASP.NET Core', icon: '🟣' },
    ],
  },
  {
    category: 'Databases & Cloud',
    items: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Azure', icon: '🔷' },
      { name: 'Git', icon: '📦' },
    ],
  },
  {
    category: 'Development Tools',
    items: [
      { name: 'VS Code', icon: '💻' },
      { name: 'IntelliJ', icon: '🛠️' },
      { name: 'Rider', icon: '🚀' },
      { name: 'PyCharm', icon: '🐍' },
    ],
  },
  {
    category: 'Testing & Monitoring',
    items: [
      { name: 'Postman', icon: '📬' },
      { name: 'Bruno', icon: '🧪' },
      { name: 'Datadog', icon: '📊' },
    ],
  },
  {
    category: 'Design & Collaboration',
    items: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Canva', icon: '🖌️' },
    ],
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
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              <div className={styles.skillsGrid}>
                {category.items.map((skill) => (
                  <div key={skill.name} className={styles.skillCard}>
                    <span className={styles.icon}>{skill.icon}</span>
                    <span className={styles.skillName}>{skill.name}</span>
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