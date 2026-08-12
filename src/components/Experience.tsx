'use client';

import { useEffect, useRef } from 'react';
// import Image from 'next/image';
import styles from './Experience.module.css';

interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    organization: 'Kennesaw State University',
    role: 'Computer Science Student',
    period: 'Current',
    description: [
      'Building a strong foundation in programming, problem solving, software engineering, and application design.',
      'Applying coursework through hands-on web, backend, and mobile development.',
    ],
    technologies: ['Java', 'Python', 'C#', 'Software Engineering'],
  },
  {
    organization: 'Peer Support & Lab Work',
    role: 'Student Support / TA-style Contributor',
    period: 'Ongoing',
    description: [
      'Helped students reason through programming fundamentals, debugging steps, and cleaner ways to explain code.',
      'Strengthened communication habits by breaking technical problems into understandable pieces.',
    ],
    technologies: ['Tutoring','Debugging', 'Communication', 'Code Review','Grading and Feedback'],
  },
  {
    organization: 'CodePath Classes',
    role: 'Student',
    period: '2025 - Present',
    description: [
      'Foundations of AI Engineering (AI110) | Spring 2026 — Earned Honors',
     'Intermediate Cybersecurity (CYB102) | Summer 2026 — Completed',
      'Technical Interview Prep Series (TIP101 – TIP103) | 2025 – Present',
    ],
    technologies: ['Claude AI.', 'Microsoft Copilot', 'Python','Splunk', 'Wireshark', 'LeetCode', 'HackerRank'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentItemRefs = itemRefs.current;

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

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    currentItemRefs.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      currentItemRefs.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.container}>
        <h2 className={styles.title}>Experience & Practice</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={exp.organization}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={styles.timelineItem}
            >
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <div className={styles.companyInfo}>
                    <span className={styles.index}>0{index + 1}</span>
                    <h3 className={styles.company}>{exp.organization}</h3>
                  </div>
                  <span className={styles.period}>{exp.period}</span>
                </div>
                <h4 className={styles.role}>{exp.role}</h4>
                <ul className={styles.description}>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className={styles.technologies}>
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
