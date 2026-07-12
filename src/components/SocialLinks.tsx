'use client';

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import styles from './SocialLinks.module.css';

export default function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <a
        href="https://github.com/codewitdean"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="GitHub Profile"
      >
        <FaGithub className={styles.icon} size={24} />
      </a>
      <a
        href="https://www.linkedin.com/in/dean-obeng-asante/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="LinkedIn Profile"
      >
        <FaLinkedin className={styles.icon} size={24} />
      </a>
      <a
        href="mailto:deanasantee@gmail.com"
        className={styles.link}
        aria-label="Email Dean"
      >
        <FaEnvelope className={styles.icon} size={24} />
      </a>
    </div>
  );
} 
