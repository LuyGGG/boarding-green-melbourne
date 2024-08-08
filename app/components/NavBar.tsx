import Link from 'next/link';
import styles from '../styles/NavBar.module.css'; 
import Image from 'next/image';

const Nav: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <Link href="/" className={styles.menuItem}>HOME</Link>
      <Link href="/bike-lane" className={styles.menuItem}>ROUTE FINDER</Link>
      <Link href="/safety-data" className={styles.menuItem}>ACCIDENT ZONES</Link>
      {/* <Link href="/night-melbourne" className={styles.menuItem}>BLACKMAIL BEN</Link> */}
      <div className={styles.logo}>
      <Image src="/logo.png" alt="Logo" width={150} height={30} />
      </div>

    </nav>
  );
};

export default Nav;
