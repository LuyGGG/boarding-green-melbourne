import Link from 'next/link';
import styles from '../styles/NavBar.module.css'; 

const Nav: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.menuItem}>HOME</Link>
      <Link href="/safety-data" className={styles.menuItem}>SAFETY DATA</Link>
      <Link href="/bike-lane" className={styles.menuItem}>BIKE-LANE</Link>
      <Link href="/co2-calculator" className={styles.menuItem}>CO2 CALCULATOR</Link>
    </nav>
  );
};

export default Nav;
