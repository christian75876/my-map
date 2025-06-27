import clsx from 'clsx';
import { ReactNode } from 'react';
import Box from '../box/SimpleBox';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <Box
      className={clsx(
        'bg-theme rounded-xl border border-accent-dark p-4 transition-all',
        className
      )}
    >
      {children}
    </Box>
  );
};

export default Card;
