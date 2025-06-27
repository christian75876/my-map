'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '@/lib/constants/config';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const DEFAULT_LOCATION: [number, number] = [-75.565765, 6.20829];
const DEFAULT_ZOOM = 14;

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  const lightPresets: Record<string, 'dawn' | 'day' | 'dusk' | 'night'> = {
    '5-7': 'dawn',
    '8-16': 'day',
    '17-19': 'dusk',
    '20-4': 'night'
  };

  const getLightPresetByTime = (): 'dawn' | 'day' | 'dusk' | 'night' => {
    const hour = new Date().getHours();
    for (const range in lightPresets) {
      const [start, end] = range.split('-').map(Number);
      if (
        (start <= end && hour >= start && hour <= end) ||
        (start > end && (hour >= start || hour <= end))
      ) {
        return lightPresets[range];
      }
    }
    return 'night';
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if ((mapboxgl as any).setTelemetryDisabled) {
      (mapboxgl as any).setTelemetryDisabled(true);
    }

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: DEFAULT_LOCATION,
      zoom: DEFAULT_ZOOM,
      pitch: 35,
      bearing: -20
    });

    mapInstance.current = map;

    map.on('style.load', () => {
      map.addSource('line', {
        type: 'geojson',
        lineMetrics: true,
        data: {
          type: 'LineString',
          coordinates: [
            [2.293389857555951, 48.85896319631851],
            [2.2890810326441624, 48.86174223718291]
          ]
        }
      });

      map.addLayer({
        id: 'line',
        source: 'line',
        type: 'line',
        paint: {
          'line-width': 12,
          'line-emissive-strength': 0.8,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'red',
            1,
            'blue'
          ]
        }
      });

      const preset = getLightPresetByTime();
      map.setConfigProperty('basemap', 'lightPreset', preset);
      map.setConfigProperty('basemap', 'showPlaceLabels', true);
      map.setConfigProperty('basemap', 'showPointOfInterestLabels', true);
      map.setConfigProperty('basemap', 'showRoadLabels', true);
      map.setConfigProperty('basemap', 'showTransitLabels', true);
    });

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocalización no soportada');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const coords: [number, number] = [longitude, latitude];
        setUserLocation(coords);

        if (mapInstance.current) {
          const el = document.createElement('div');
          el.className = 'pulse';

          new mapboxgl.Marker({ color: 'red' })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setText('Tu ubicación'))
            .addTo(mapInstance.current);

          mapInstance.current.flyTo({ center: coords, zoom: 16 });
        }
      },
      err => {
        console.warn('No se pudo obtener ubicación:', err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  return { mapRef, mapInstance, userLocation };
};
