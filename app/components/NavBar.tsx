import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NavBar.module.css';

const Nav = () => {
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.menuItem}>HOME</Link>
      <Link href="/bike-lane" className={styles.menuItem}>ROUTE FINDER</Link>
      <Link href="/safety-data" className={styles.menuItem}>ACCIDENT ZONES</Link>
      <Link href="/co2-calculator" className={styles.menuItem}>CO2 CALCULATOR</Link>
      <div className={styles.logo}>
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={150}   
          height={30}   
        />
      </div>
    </nav>
  );
};

export default Nav;
