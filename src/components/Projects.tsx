'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  demo?: string;
}

const projects: Project[] = [
  {
  title: 'ReadyUp',
  description: 'ReadyUp is a React, Node, and MongoDB app I built to help students organize internship prep, school tasks, and personal goals. I focused on task organization, progress tracking, and deploying a usable full-stack app.',
  image: '/images/readyup.png',
  technologies: ['React.js', 'JavaScript', 'Node.js', 'MongoDB'],
  link: 'https://github.com/codewitdean/ReadyUp',
  demo: 'https://readyup-eo6ha1k2k-dean-s-projects-1260c6bd.vercel.app/'
},
  {
    title: 'Project 2',
    description: 'Give a brief description of your project here.',
    image: '/images/Project.png',
    technologies: ['ASP.NET', 'C#','SQLite'],
    link: 'link-to-your-repo',
    demo: 'link-to-live-demo'
  },
];

export default function Projects() {
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
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>Projects</h2>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.project}>
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  <a href={project.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  {project.demo && (
                    <a href={project.demo} className={`${styles.link} ${styles.demo}`} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 