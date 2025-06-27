import clsx from 'clsx';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import Icon from '../icon/SimpleIcon';

type IconButtonVariant = 'solid' | 'outline' | 'ghost' | 'transparent';
type IconButtonColor = 'primary' | 'secondary' | 'danger' | 'gray';
type IconButtonShape = 'rounded' | 'square';
type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  shape?: IconButtonShape;
  size?: IconButtonSize;
}

/**
 * A reusable icon button component with different styles and sizes.
 * Now supports `ref` for better accessibility in dropdowns.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = 'solid',
      color = 'primary',
      shape = 'rounded',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'flex cursor-pointer items-center justify-center transition-all duration-300',
          'focus:outline-none',
          {
            // 🔹 Tamaños del botón
            'h-8 w-8': size === 'sm',
            'h-10 w-10': size === 'md',
            'h-12 w-12': size === 'lg',

            // 🔹 Formas (redondeado o cuadrado)
            'rounded-full': shape === 'rounded',
            'rounded-lg': shape === 'square',

            // 🔹 Variantes y colores
            'bg-primary text-white hover:bg-primary-light focus:ring-primary':
              variant === 'solid' && color === 'primary',
            'border border-accent-dark text-primary hover:opacity-80 focus:ring-primary':
              variant === 'outline' && color === 'primary',
            'bg-secondary text-white hover:bg-secondary-light focus:ring-secondary':
              variant === 'solid' && color === 'secondary',
            'border border-secondary text-secondary hover:bg-secondary/10 focus:ring-secondary':
              variant === 'outline' && color === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400':
              variant === 'solid' && color === 'danger',
            'border border-red-500 text-red-600 hover:bg-red-100 focus:ring-red-500':
              variant === 'outline' && color === 'danger',
            'bg-primary-transparent text-primary ring-2 hover:bg-primary/30':
              variant === 'transparent',
            'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400':
              variant === 'solid' && color === 'gray',
            'border border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400':
              variant === 'outline' && color === 'gray',

            // 🔹 Ghost Variant (sin fondo, solo icono)
            'text-primary hover:bg-primary/10 focus:ring-primary':
              variant === 'ghost' && color === 'primary',
            'text-white hover:bg-secondary/10 focus:ring-secondary':
              variant === 'ghost' && color === 'secondary',
            'text-red-600 hover:bg-red-100 focus:ring-red-500':
              variant === 'ghost' && color === 'danger',
            'text-gray-800 hover:bg-gray-100 focus:ring-gray-400':
              variant === 'ghost' && color === 'gray',

            // 🔹 Disabled
            'cursor-not-allowed opacity-50': props.disabled
          },
          className
        )}
        {...props}
      >
        <Icon
          name={icon}
          className={clsx('transition-all', {
            'text-sm': size === 'sm',
            'text-md': size === 'md',
            'text-lg': size === 'lg'
          })}
        />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
