
import React from 'react';
import styles from './styles/HomePage.module.css'; 

const Home: React.FC = () => {
    return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.leftSide}>
                        <header>
                            <h1>RIDE GREEN MELBOURNE</h1>
                            <p>Pedal away for a greener tomorrow!</p>
                        </header>
                    </div>
                    <div className={styles.rightSide}>
                        <img src="/cycling-home.png" alt="Cycling Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
    );
}

export default Home;
