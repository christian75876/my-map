import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../icon/SimpleIcon';

interface CustomCheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  required?: boolean;
  checkedBorderColor?: string;
  uncheckedBorderColor?: string;
  checkedBackgroundColor?: string;
  uncheckedBackgroundColor?: string;
}

const CustomCheckbox = ({
  id,
  name,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  className = '',
  size = 'md',
  label,
  required = false,
  uncheckedBorderColor = 'gray-300',
  checkedBackgroundColor = 'bg-purple-500',
  uncheckedBackgroundColor = 'bg-accent-dark'
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleChange = () => {
    if (disabled) return;

    const newCheckedState = checked !== undefined ? !checked : !isChecked;

    if (checked === undefined) {
      setIsChecked(newCheckedState);
    }

    onChange?.(newCheckedState);
  };

  const actualChecked = checked !== undefined ? checked : isChecked;

  const sizeClasses = {
    sm: 'size-2',
    md: 'size-4',
    lg: 'size-6'
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className='flex items-center'>
      <div
        id={id}
        role='checkbox'
        aria-checked={actualChecked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleChange}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleChange();
          }
        }}
        data-name={name}
        className={clsx(
          'flex items-center justify-center rounded-sm transition-all',
          sizeClasses[size],
          actualChecked
            ? `${checkedBackgroundColor} text-white`
            : `border-1 border-${uncheckedBorderColor} ${uncheckedBackgroundColor}`,
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className
        )}
      >
        {actualChecked && (
          <Icon name='bx-check' size={iconSize[size]} className='text-white' />
        )}
      </div>

      {label && (
        <label
          htmlFor={id}
          className={clsx(
            'ml-1 text-sm whitespace-nowrap text-neutral-white md:text-base dark:text-gray-300',
            disabled && 'opacity-50',
            required && 'after:ml-0.5 after:text-red-500 after:content-["*"]'
          )}
          onClick={!disabled ? handleChange : undefined}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckbox;
