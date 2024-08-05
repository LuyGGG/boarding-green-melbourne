// use client
import React from 'react';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css'; 

const CO2Calculator = () => {
  return (
    <div className={styles.container}>
        <title>CO2 Calculator</title>
        <meta name="description" content="Calculate your CO2 emissions." />

      <main className={styles.main}>
        <h1 className={styles.title}>
          CO2 Calculator
        </h1>
        <p>This page will calculate CO2 emissions for your bike rides.</p>
        <Link href="/">Go back to home</Link>
      </main>
    </div>
  );
};

export default CO2Calculator;
