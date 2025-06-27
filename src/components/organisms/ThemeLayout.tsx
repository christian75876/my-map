import { ReactNode } from 'react';
import ThemeToggle from '../atoms/ThemeToggle';

interface ThemeLayoutProps {
  children: ReactNode;
}

const ThemeLayout = ({ children }: ThemeLayoutProps) => {
  return (
    <div className='min-h-screen'>
      {/* Header with theme toggle */}
      <header className='card-theme border-theme sticky top-0 z-10 border-b'>
        <div className='container mx-auto flex items-center justify-between px-4 py-3'>
          <div className='text-theme font-semibold'>DeUna Dropshipping</div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};

export default ThemeLayout;
