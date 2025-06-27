import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';
import Box from '../box/SimpleBox';
import ErrorMessage from '../error-message/SimpleErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Box className='mb-4 w-full'>
        <input
          ref={ref}
          className={clsx(
            'bg-theme text-theme w-full rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-accent-dark focus:ring-primary',
            className
          )}
          {...props}
        />
        {error && <ErrorMessage message={error} />}
      </Box>
    );
  }
);

Input.displayName = 'Input';

export default Input;
