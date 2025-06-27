import clsx from 'clsx';

interface SimpleHrProps {
  width?: string;
  className?: string;
}

const SimpleHr = ({ width = '90%', className }: SimpleHrProps) => {
  return (
    <hr
      className={clsx('mx-auto border-t border-gray-300', className)}
      style={{ width }}
    />
  );
};

export default SimpleHr;
