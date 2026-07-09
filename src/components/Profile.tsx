'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import styles from './Profile.module.css';
import SocialLinks from './SocialLinks';

const proofPoints = [
  'Full-stack web apps',
  'Android-focused problem solving',
  'CS lab and peer support',
];

const heroStats = [
  { value: 'CS', label: 'Kennesaw State University' },
  { value: 'Full-stack', label: 'React, Node, ASP.NET' },
  { value: 'Builder', label: 'Product-minded projects' },
];

export default function Profile() {
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
    <section id="home" ref={sectionRef} className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={styles.eyebrow}>Computer Science Student / Full-stack Developer</p>
            <h1 className={styles.title}>
              Building practical software with clean systems and thoughtful interfaces.
            </h1>
            <p className={styles.subtitle}>
              I&apos;m Dean, a CS student at Kennesaw State University focused on turning ideas into useful web, backend, and mobile experiences.
            </p>

            <div className={styles.education}>
              <span className={styles.schoolName}>Kennesaw State University</span>
              <span>Bachelor of Science in Computer Science</span>
              <span>Minor in Software Engineering</span>
            </div>

            <div className={styles.proofList} aria-label="Focus areas">
              {proofPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>

            <div className={styles.buttons}>
              <a href="#projects" className={styles.button}>
                <FaArrowRight aria-hidden="true" />
                View Projects
              </a>
              <a href="/files/CNRes_Oct25.pdf" className={`${styles.button} ${styles.outline}`} target="_blank" rel="noopener noreferrer">
                <FaFileAlt aria-hidden="true" />
                Resume
              </a>
              <a href="#contact" className={`${styles.button} ${styles.ghost}`}>
                <FaEnvelope aria-hidden="true" />
                Contact
              </a>
            </div>
          </div>

          <div className={styles.visual} aria-label="Dean profile summary">
            <div className={styles.imageFrame}>
              <Image
                src="/images/about-pic.jpg"
                alt="Dean Obeng Asante"
                className={styles.image}
                fill
                sizes="(max-width: 768px) 82vw, 430px"
                priority
                quality={92}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.statGrid}>
              {heroStats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
} 
