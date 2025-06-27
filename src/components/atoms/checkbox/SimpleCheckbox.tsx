import React from 'react';
import clsx from 'clsx';
import Icon from '../icon/SimpleIcon';

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const SimpleCheckbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label,
  disabled = false,
  className
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <input
        id={id}
        name={name}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className='hidden'
      />
      <div
        className={clsx(
          'mr-2 flex h-5 w-5 items-center justify-center rounded border',
          checked ? 'border-purple-500 bg-purple-500' : 'border-gray-300',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        )}
        onClick={() => {
          if (!disabled && onChange) {
            onChange({
              target: {
                checked: !checked
              }
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      >
        {checked && <Icon name='bx-check' size={16} className='text-white' />}
      </div>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            'text-gray-700',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
          onClick={() => {
            if (!disabled && onChange) {
              onChange({
                target: {
                  checked: !checked
                }
              } as React.ChangeEvent<HTMLInputElement>);
            }
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default SimpleCheckbox;
