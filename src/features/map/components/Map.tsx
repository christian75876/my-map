'use client';

import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { MAPBOX_ACCESS_TOKEN } from '@/lib/constants/config';
import { useMap } from '../hooks/useMap';
import Box from '@/components/atoms/box';
import LoadingScreen from '@/common/components/LoadingScreen';

import dynamic from 'next/dynamic';
import PanoramaScene from '@/features/map/components/PanoramaViewer';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export const Map = () => {
  const { mapRef, mapInstance } = useMap();
  const [loading, setLoading] = useState(true);
  const [show360, setShow360] = useState(false);
  useEffect(() => {
    if (!mapRef.current || loading) return;

    const el = document.createElement('img');
    el.src =
      'https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png';
    el.className = 'w-8 h-8 cursor-pointer';
    el.style.borderRadius = '50%';

    el.addEventListener('click', () => {
      console.log('🔍 Clic en el marcador: mostremos el visor 360');

      setShow360(true);
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([-75.565, 6.208]) // Coordenadas reales
      .addTo(mapInstance.current!); // Asegúrate de tener acceso a la instancia del mapa

    return () => {
      marker.remove();
    };
  }, [mapRef, loading]);

  useEffect(() => {
    // Simula una carga mínima de 3 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className='relative h-screen w-full overflow-hidden'>
      {loading && (
        <Box className='absolute inset-0 z-50'>
          <LoadingScreen />
        </Box>
      )}
      <div
        ref={mapRef}
        className={`h-full w-full rounded-lg shadow-md transition-opacity duration-300 ${
          loading ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      />
      {show360 && (
        <div className='absolute inset-0 z-40'>
          <PanoramaScene src='/images/img.jpg' />
        </div>
      )}
    </Box>
  );
};
