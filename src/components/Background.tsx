import styles from './Background.module.css';

const Background = () => {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.gradient} />
      <div className={styles.grid} />
    </div>
  );
};

export default Background; 
