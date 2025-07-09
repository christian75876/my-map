'use client';
import Box from '@/components/atoms/box/SimpleBox';
import Icon from '@/components/atoms/icon/SimpleIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Explorar rutas', path: '/explore', icon: 'bx-map' },
  { label: 'Mapa interactivo', path: '/map', icon: 'bx-compass' },
  { label: 'Mis aventuras', path: '/trips', icon: 'bx-walk' },
  { label: 'Favoritos', path: '/favorites', icon: 'bx-heart' }
];

const NavigationMenu = () => {
  const pathname = usePathname();
  return (
    <Box className='flex space-x-8'>
      {navItems.map(({ label, path, icon }) => (
        <Link
          key={path}
          href={path}
          className={`text-md flex items-center gap-2 font-medium transition-all duration-200 ${
            pathname === path
              ? 'border-b-2 border-primary pb-1 text-primary'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          <Icon name={icon} size={18} className='text-inherit' />
          {label}
        </Link>
      ))}
    </Box>
  );
};

export default NavigationMenu;
