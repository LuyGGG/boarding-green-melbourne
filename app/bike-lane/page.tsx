'use client'

import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/BikeLane.module.css';

import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const BikeLane = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [144.9631, -37.8136],
        zoom: 12
      });

      mapInstance.current.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken
        }),
        'top-left'
      );
    }

    // Cleanup the map when the component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); 

  return (
    <div className={styles.container}>
      <Head>  
        <title>Bike Lane Finder</title>
        <meta name="description" content="Find bike lanes in Melbourne." />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bike Lane Finder
        </h1>
        <p>This page will help you find bike lanes.</p>
        <div className={styles.mapContainer} ref={mapContainer} style={{ height: 400 }}/>
      </main>
    </div>
  );
};

export default BikeLane;
