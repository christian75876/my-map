import React, { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import Icon from '@/components/atoms/icon';
import CustomCheckbox from '@/components/atoms/checkbox';
import Box from '@/components/atoms/box';

type SearchVariant = 'solid' | 'outline' | 'ghost';
type SearchColor = 'primary' | 'secondary' | 'danger' | 'gray';
type SearchShape = 'rounded' | 'square';
type SearchSize = 'sm' | 'md' | 'lg';

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: string;
  variant?: SearchVariant;
  color?: SearchColor;
  shape?: SearchShape;
  inputSize?: SearchSize;
  iconPosition?: 'left' | 'right';
  placeholder?: string;
  checkboxes?: {
    label: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
  }[];
}

const SearchBar = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      icon,
      variant = 'solid',
      color = 'gray',
      shape = 'rounded',
      inputSize = 'md',
      iconPosition = 'right',
      className,
      placeholder,
      checkboxes,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          'flex w-full items-center justify-between',
          {
            'h-10 w-full p-3': inputSize === 'sm',
            'h-12 w-full p-3': inputSize === 'md',
            'h-12 w-full p-3 px-4 text-lg': inputSize === 'lg',

            'rounded-full': shape === 'rounded',
            'rounded-lg': shape === 'square',

            'bg-accent-dark': variant === 'solid',
            'border bg-transparent': variant === 'outline',
            'bg-transparent': variant === 'ghost',

            'border-primary focus-within:ring-primary': color === 'primary',
            'border-secondary focus-within:ring-secondary':
              color === 'secondary',
            'border-red-500 focus-within:ring-red-500': color === 'danger',
            'border-gray-400 focus-within:ring-gray-400': color === 'gray'
          },
          className
        )}
      >
        <Box className='flex w-full items-center'>
          {icon && iconPosition === 'left' && (
            <Icon
              name={icon}
              className={clsx('transition-all', {
                'mr-2 text-sm': inputSize === 'sm',
                'text-md mr-3': inputSize === 'md',
                'mr-3 text-lg': inputSize === 'lg'
              })}
            />
          )}

          <input
            ref={ref}
            type='text'
            className='w-full bg-transparent placeholder-gray-500 outline-none'
            placeholder={placeholder}
            {...rest}
          />

          {icon && iconPosition === 'right' && (
            <Icon
              name={icon}
              className={clsx('transition-all', {
                'ml-2 text-sm': inputSize === 'sm',
                'text-md ml-3': inputSize === 'md',
                'ml-3 text-lg': inputSize === 'lg'
              })}
            />
          )}
        </Box>

        {checkboxes && checkboxes.length > 0 && (
          <Box className='flex items-center gap-2'>
            {checkboxes.map(checkbox => (
              <CustomCheckbox
                disabled={checkbox.disabled}
                key={checkbox.label}
                label={checkbox.label}
                checked={checkbox.checked}
                size='md'
                onChange={checkbox.onChange}
                className='accent-purple-500 md:h-4 md:w-4'
              />
            ))}
          </Box>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
