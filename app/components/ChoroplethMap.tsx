'use client';
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer, MapMouseEvent } from 'react-map-gl';
import type { FeatureCollection, Feature, GeoJsonProperties, Geometry } from 'geojson';
import { FillLayer } from 'react-map-gl'; // Import FillLayer from react-map-gl

// Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const dataUrl = 'https://fit5120-onboarding.s3.ap-southeast-2.amazonaws.com/merged_data.geojson';  

// Fill Layer for map
const fillLayer: FillLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'accident_count', 
      stops: [
        [0, '#319e31'],    
        [500, '#578c06'],   
        [1000, '#7a8c06'],  
        [2000, '#7dbd4f'],  
        [4000, '#ffff52'],  
        [6000, '#f5c642'],  
        [8000, '#fdae61'],  
        [10000, '#f46d43'], 
        [20000, '#bf4d34']  
      ]
    },
    'fill-opacity': 0.8
  },
  source: ''
};

export default function PostcodeHeatMap() {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ feature: Feature<Geometry, GeoJsonProperties>, x: number, y: number } | null>(null);

  useEffect(() => {
    fetch(dataUrl)
      .then(resp => resp.json())
      .then(json => setData(json))  // Assuming your data is already properly formatted for use as a fill layer
      .catch(err => console.error('Could not load data', err));
  }, []);

  const onHover = useCallback((event: MapMouseEvent) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0];
    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          latitude: -37.81,  // Adjust latitude and longitude to center the map appropriately
          longitude: 144.96,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...fillLayer} />
          </Source>
        )}
      </Map>
      {hoverInfo && (
        <div className="tooltip" style={{ position: 'absolute', left: hoverInfo.x, top: hoverInfo.y, backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
          <div>Postcode: {hoverInfo.feature.properties?.mccid_int}</div>
          <div>Accident Count: {hoverInfo.feature.properties?.accident_count}</div>
        </div>
      )}
    </>
  );
}

export function renderToDom(container: HTMLElement) {
  createRoot(container).render(<PostcodeHeatMap />);
}
