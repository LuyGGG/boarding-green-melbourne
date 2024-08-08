import React from 'react';
import styles from './styles/HomePage.module.css'; 
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.leftSide}>
                    <header>
                        <h1 className={styles.textAnimation}>RIDE GREEN MELBOURNE</h1>
                        <p className={styles.textAnimation}>Pedal away for a greener tomorrow!</p>
                    </header>
                    <div className={styles.buttonWrapper}> 
                        <Link href="/bike-lane" passHref>
                            <button className={styles.buttonAnimation}>Ride Now</button>
                        </Link>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <img src="/cycling-home.jpg" alt="Cycling Home" className={styles.imageAnimation} />
                </div>
            </div>
        </div>
    );
}

export default Home;
