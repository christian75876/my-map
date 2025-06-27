import clsx from 'clsx';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  speed?: 'slow' | 'normal' | 'fast';
}

const Loader = ({
  size = 'md',
  color = 'primary',
  speed = 'normal'
}: LoaderProps) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-4 border-t-transparent',
        {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-10 w-10': size === 'lg',

          'border-primary-light': color === 'primary',
          'border-secondary-light': color === 'secondary',
          'border-white': color === 'white',
          'border-neutral-gray': color === 'gray',

          'animate-spin-slow': speed === 'slow',
          'animate-spin': speed === 'normal',
          'animate-spin-fast': speed === 'fast'
        }
      )}
    />
  );
};

export default Loader;
