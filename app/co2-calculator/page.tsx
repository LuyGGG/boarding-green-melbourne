'use client';
// use client
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/CO2Calculator.module.css';

const CO2_PER_KM_CAR = 0.271; // kg CO2 per km for car
const TREES_SAVED_PER_KG_CO2 = 0.06; // approximate number of trees that absorb 1 kg of CO2 per year

const CO2Calculator = () => {
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<{ co2Saved: string; treesSaved: string; caloriesBurned: string; burgerEquivalent: string } | null>(null);

  const handleCalculate = () => {
    if (distance) {
      const co2Saved = Number(distance) * CO2_PER_KM_CAR;
      const treesSaved = co2Saved * TREES_SAVED_PER_KG_CO2;
      setResult({ 
        co2Saved: co2Saved.toFixed(2), 
        treesSaved: treesSaved.toFixed(2),
        caloriesBurned: calculateCaloriesBurned(co2Saved),
        burgerEquivalent: calculateBurgerEquivalent(co2Saved)
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>CO2 Calculator</h1>
        <p>This page will calculate CO2 emissions for your bike rides.</p>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <h2 className={styles.header}>Your current commute</h2>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Distance (in km) one way:</label>
              <input
                type="number"
                className={styles.inputNumber}
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g. 5"
              />
              <button className={styles.calculateButton} onClick={handleCalculate}>
                CALCULATE →
              </button>
            </div>
          </div>
          <div className={styles.rightSide}>
            {result ? (
              <>
                <div className={styles.benefits}>
                  <h2>Environmental benefits:</h2>
                  <p>CO2 emissions saved per year: {result.co2Saved} kg</p>
                  <p>Equivalent of: {result.treesSaved} trees</p>
                </div>
                <div className={styles.benefits}>
                  <h2>Health benefits:</h2>
                  <p>Calories burned per week: {result.caloriesBurned} cal</p>
                  <p>Equivalent of: {result.burgerEquivalent} burgers</p>
                </div>
              </>
            ) : (
              <p>Enter details to see savings.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

function calculateCaloriesBurned(co2Saved: number) {
  // Assume burning 50 calories saves about 1 kg of CO2
  return ((co2Saved / CO2_PER_KM_CAR) * 50).toFixed(0);
}

function calculateBurgerEquivalent(co2Saved: number) {
  // Assume one burger is about 500 calories
  return (Number(calculateCaloriesBurned(co2Saved)) / 500).toFixed(1);
}

export default CO2Calculator;
