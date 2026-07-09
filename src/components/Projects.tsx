'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import styles from './Projects.module.css';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  outcome: string;
  status: string;
  link?: string;
  demo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'ReadyUp',
    description: 'A full-stack planning app for students balancing internship prep, school tasks, and personal goals. I focused on task organization, progress tracking, and deploying a usable product.',
    image: '/images/readyup.png',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'MongoDB'],
    outcome: 'Productivity workflow for students',
    status: 'Live full-stack app',
    link: 'https://github.com/codewitdean/ReadyUp',
    demo: 'https://readyup-eo6ha1k2k-dean-s-projects-1260c6bd.vercel.app/',
    featured: true,
  },
  {
    title: 'ASP.NET Core Coursework App',
    description: 'A backend-focused practice project for strengthening C#, ASP.NET Core, SQLite data modeling, and clean application structure. This is positioned as an in-progress learning build instead of a placeholder.',
    image: '/images/Project.png',
    technologies: ['ASP.NET Core', 'C#', 'SQLite'],
    outcome: 'Backend fundamentals and data flow',
    status: 'In progress',
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
            <article
              key={project.title}
              className={`${styles.project} ${project.featured ? styles.featured : ''}`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className={styles.status}>{project.status}</span>
              </div>
              <div className={styles.content}>
                <p className={styles.outcome}>{project.outcome}</p>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.link || project.demo) && (
                  <div className={styles.links}>
                    {project.link && (
                      <a href={project.link} className={styles.link} target="_blank" rel="noopener noreferrer">
                        <FaGithub aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className={`${styles.link} ${styles.demo}`} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 
