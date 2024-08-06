'use client';
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/BikeLane.module.css';

const BikeLane = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [144.9631, -37.8136],
      zoom: 12
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
      alternatives: true,
      proximity: [144.9631, -37.8136]
    });

    map.addControl(directions, 'top-left');

    map.on('load', () => {
      fetch('https://fit5120-onboarding.s3.ap-southeast-2.amazonaws.com/transformed_bike-lane.geojson')
        .then(response => response.json())  
        .then(data => {
          map.addSource('bike-routes', {
            type: 'geojson',
            data: data  
          });
    
          map.addLayer({
            id: 'bike-routes-layer',
            type: 'line',
            source: 'bike-routes',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#2e88a6',
              'line-width': 2
            }
          });
        })
        .catch(error => console.error('Error loading or parsing the GeoJSON data: ', error));
    });
    

    return () => map && map.remove();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bike Lane Finder
        </h1>
      </div>
      <div ref={mapContainer} style={{ height: '100vh' }}>
        {/* Map will render here */}
      </div>

    </div>
  );
};

export default BikeLane;
