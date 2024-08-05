'use client'
import * as React from 'react';
import { useRef, MouseEvent } from 'react';
import { Map, Source, Layer } from 'react-map-gl';

import ControlPanel from '../components/ControlPanel';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

import type { MapRef, MapEvent, MapMouseEvent } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import type { Feature } from 'geojson';
import styles from '../styles/SafetyData.module.css';
import Head from 'next/head';


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''; 

export default function SafetyData() {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: MapMouseEvent) => {
    const feature: Feature | undefined = event.features?.[0];
    const clusterId = feature?.properties?.cluster_id;

    if (mapRef.current && clusterId !== undefined) {
      const mapboxSource = mapRef.current.getSource('earthquakes') as GeoJSONSource;
      
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (!err && zoom !== undefined) {
          const zoomValue = zoom ?? 0; // Default to 0 if zoom is undefined
          if (feature !== undefined) {
            mapRef.current?.easeTo({
              center: (feature.geometry as any).coordinates,
              zoom: zoomValue,
              duration: 500
            });
          }
        }
      });
    }
  };

  return (

    <div className={styles.layout}>
      <Head>  
        <title>Crash Accident Map</title>
      </Head>
      <h1 className={styles.title}>
        Crash Accident Map
      </h1>
      <div className={styles.mapContainer}>
        <Map
          initialViewState={{
            latitude: -37.8136,
            longitude: 144.9631,
            zoom: 1
          }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id || '']}
          onClick={onClick}
          ref={mapRef }
          style={{ height: 600 }}
        >
          <Source
            id="earthquakes"
            type="geojson"
            data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        </Map>
      </div>
      <div className={styles.container}>
      <ControlPanel />
      </div>
    </div>
  );
}