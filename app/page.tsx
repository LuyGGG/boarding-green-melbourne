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
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <img src="/route-finder.png" alt="Route Finder"  className={styles.cardImage}/>
                    <p>Explore optimal cycling routes with our Route Finder tool.</p>
                    <Link href="/bike-lane" passHref>
                        <button className={styles.buttonAnimation}>Visit Route Finder</button>
                    </Link>
                </div>
                <div className={styles.card}>
                    <img src="/safety-data.png" alt="Accident Zones" className={styles.cardImage} />
                    <p>Identify high-risk areas with our interactive Accident Zones map.</p>
                    <Link href="/safety-data" passHref>
                        <button className={styles.buttonAnimation}>Explore Accident Zones</button>
                    </Link>
                </div>
                <div className={styles.card}>
                    <img src="/co2-calculator.png" alt="CO2 Calculator" className={styles.cardImage}/>
                    <p>Calculate your ride&apos;s environmental impact with our CO2 Calculator.</p>
                    <Link href="/co2-calculator" passHref>
                        <button className={styles.buttonAnimation}>Use CO2 Calculator</button>
                    </Link>
                </div>
            </div>
        </div>

        
    );
}



export default Home;
