'use client';

import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <a
        href="https://github.com/githubUsername"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="GitHub Profile"
      >
        <FaGithub className={styles.icon} size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/name-here/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="LinkedIn Profile"
      >
        <FaLinkedin className={styles.icon} size={24} />
      </a>
    </div>
  );
} 