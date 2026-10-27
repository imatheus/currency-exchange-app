import styles from './Status.module.css';

export default function Status({ type, message }) {
  return <p className={`${styles.status} ${styles[type]}`}>{message}</p>;
}
