'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn.utils';
import Box from '@/components/atoms/box';
import Typography from '@/components/atoms/typography';

const images = [
  '/images/mag1.jpg',
  '/images/mag2.jpg',
  '/images/mag3.jpg',
  '/images/mag4.jpg'
];

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen = () => {
  const [visibleImages, setVisibleImages] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const showDelay = 400; // 0.5s entre imágenes

    if (visibleImages < images.length) {
      const timer = setTimeout(() => {
        setVisibleImages(prev => prev + 1);
      }, showDelay);
      return () => clearTimeout(timer);
    }
  }, [visibleImages]);

  useEffect(() => {
    const totalDuration = 7000;
    const steps = 100;
    const interval = totalDuration / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box className='relative flex h-full w-full flex-col items-center justify-start overflow-hidden bg-accent-dark p-4 text-white'>
      <Box className='relative mt-5 aspect-[3/2] w-full max-w-[350px]'>
        {images.slice(0, visibleImages).map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`Imagen ${idx}`}
            fill
            className={cn(
              'absolute rounded-md object-cover shadow-lg transition-all duration-500',
              idx % 2 === 0 ? 'rotate-[-6deg]' : 'rotate-[6deg]',
              `translate-x-[${idx * 8}px] translate-y-[${idx * 8}px]`
            )}
            style={{ zIndex: idx }}
          />
        ))}
      </Box>

      <Box className='mt-40 h-2 w-2/3 overflow-hidden rounded-full bg-white/30'>
        <div
          className='h-full bg-white transition-all duration-100'
          style={{ width: `${progress}%` }}
        />
      </Box>

      <Typography variant='p' className='mt-2 text-sm text-white/80'>
        Cargando mapa... {progress}%
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
