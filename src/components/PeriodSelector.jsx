import styles from './PeriodSelector.module.css';
import { PERIODS } from '../constants/periods.js';

export default function PeriodSelector({ days, onChange }) {
  return (
    <div className={styles.periods}>
      {PERIODS.map((p) => (
        <button
          key={p.days}
          type="button"
          className={p.days === days ? styles.active : ''}
          onClick={() => onChange(p.days)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
