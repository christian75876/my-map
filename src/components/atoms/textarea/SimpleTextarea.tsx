import clsx from 'clsx';
import { TextareaHTMLAttributes, forwardRef } from 'react';
import Box from '../box/SimpleBox';
import ErrorMessage from '../error-message/SimpleErrorMessage';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Box className='w-full'>
        <textarea
          ref={ref}
          className={clsx(
            'bg-theme text-theme min-h-[100px] w-full rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:outline-none',
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

Textarea.displayName = 'Textarea';

export default Textarea;
