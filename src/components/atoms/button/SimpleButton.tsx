import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import Icon from '../icon';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'ghost'
  | 'transparent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  isLoading = false,
  rightIcon,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-2 rounded-lg transition-all duration-300',
        'cursor-pointer focus:outline-none',
        'whitespace-nowrap',
        {
          'px-3 py-1 text-sm': size === 'sm',
          'text-md px-5 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',

          'w-full': fullWidth,
          'w-auto': !fullWidth,

          'bg-primary text-neutral-white hover:bg-primary-dark focus:ring-primary-light':
            variant === 'primary' && !disabled,
          'theme-text bg-secondary hover:bg-secondary-dark focus:ring-secondary-light':
            variant === 'secondary' && !disabled,
          'theme-text border border-accent-dark':
            variant === 'outline' && !disabled,
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400':
            variant === 'danger' && !disabled,
          'bg-transparent text-primary': variant === 'ghost' && !disabled,
          'bg-primary-transparent text-primary ring-2 hover:bg-primary/30':
            variant === 'transparent',
          'theme-text !cursor-not-allowed bg-primary opacity-50':
            variant === 'primary' && disabled,
          '!cursor-not-allowed border border-accent-dark bg-transparent text-white opacity-50':
            variant === 'outline' && disabled,
          '!cursor-not-allowed opacity-50':
            variant === 'transparent' && disabled
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && (
        <span
          className={clsx('flex', {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-lg': size === 'lg'
          })}
        >
          {leftIcon}
        </span>
      )}
      {isLoading ? <Icon size={20} name='loader-alt'></Icon> : children}
      {rightIcon && (
        <span
          className={clsx('flex', {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-lg': size === 'lg'
          })}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
