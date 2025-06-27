import clsx from 'clsx';
import { forwardRef, SelectHTMLAttributes } from 'react';
import Box from '../box/SimpleBox';
import ErrorMessage from '../error-message/SimpleErrorMessage';
import Icon from '../icon/SimpleIcon';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  placeholder?: string;
  options?: SelectOption[];
  containerClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      error,
      children,
      placeholder,
      options,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        className={clsx(
          'relative flex items-center justify-center',
          containerClassName
        )}
      >
        <select
          ref={ref}
          className={clsx(
            'bg-theme text-theme w-full appearance-none rounded-lg border px-4 pr-10 transition-all focus:ring-2 focus:outline-none',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-accent-dark focus:ring-primary',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value='' disabled={props.required}>
              {placeholder}
            </option>
          )}
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        <div className='pointer-events-none absolute top-[55%] right-3 -translate-y-1/2 transform'>
          <Icon name='bx-chevron-down' />
        </div>
        {error && <ErrorMessage message={error} />}
      </Box>
    );
  }
);

Select.displayName = 'Select';

export default Select;
