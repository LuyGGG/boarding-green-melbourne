import * as React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import type { FillLayer } from 'react-map-gl';
import { range } from 'd3-array';
import { scaleQuantile } from 'd3-scale';
import type { FeatureCollection, Geometry, Feature, GeoJsonProperties } from 'geojson';

import { MapMouseEvent } from 'react-map-gl';

// Mapbox access token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Utility function to update percentile
function updatePercentiles(
  featureCollection: FeatureCollection<Geometry>,
  accessor: (feature: Feature<Geometry>) => number
): FeatureCollection<Geometry> {
  const features = featureCollection.features;
  const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
  return {
    type: 'FeatureCollection',
    features: features.map(f => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value)
      };
      return { ...f, properties };
    })
  };
}

// Choropleth layer style
const dataLayer: FillLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': {
            property: 'percentile',
            stops: [
                [0, '#3288bd'],
                [1, '#66c2a5'],
                [2, '#abdda4'],
                [3, '#e6f598'],
                [4, '#ffffbf'],
                [5, '#fee08b'],
                [6, '#fdae61'],
                [7, '#f46d43'],
                [8, '#d53e4f']
            ]
        },
        'fill-opacity': 0.8
    },
    source: ''
};

export default function ChoroplethMap() {
  const [year, setYear] = useState(2015);
  const [allData, setAllData] = useState<FeatureCollection<Geometry> | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ feature: Feature<Geometry>; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson')
      .then(resp => resp.json())
      .then(json => setAllData(json))
      .catch(err => console.error('Could not load data', err));
  }, []);

  
  const onHover = useCallback((event: MapMouseEvent) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature: Feature<Geometry, GeoJsonProperties> | undefined = features && features[0];
  
    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);

  const data = useMemo(() => {
    return allData && updatePercentiles(allData, f => f.properties?.income[year]);
  }, [allData, year]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
      >
        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <div className="tooltip" style={{ position: 'absolute', left: hoverInfo.x, top: hoverInfo.y, backgroundColor: 'white', padding: '10px' }}>
            <div>State: {hoverInfo.feature.properties?.name}</div>
            <div>Median Household Income: {hoverInfo.feature.properties?.value}</div>
            <div>Percentile: {(hoverInfo.feature.properties?.percentile / 8) * 100}%</div>
          </div>
        )}
      </Map>
    </>
  );
}

export function renderToDom(container: Container) {
  createRoot(container).render(<ChoroplethMap />);
}
