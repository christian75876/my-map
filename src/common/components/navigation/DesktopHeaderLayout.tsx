import Box from '@/components/atoms/box';
import React from 'react';
import NavigationMenu from './NavigationMenu';
import LogoWithText from '../LogoWithText';

const DesktopHeaderLayout = () => {
  return (
    <Box className='bg-neutral-white hidden w-full items-center justify-between px-8 py-4 lg:flex'>
      <LogoWithText title='Mountaint' subtitle='Medellin' />
      <NavigationMenu />
    </Box>
  );
};

export default DesktopHeaderLayout;
