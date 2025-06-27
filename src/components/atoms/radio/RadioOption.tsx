import React from 'react';
import Box from '../box';
import clsx from 'clsx';

interface RadioOptionProps {
  value: string;
  label: string;
  isChecked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  isChecked = false,
  onChange,
  disabled = false
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  return (
    <Box
      className={clsx(
        'flex items-center',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <Box
        className={clsx(
          'relative mr-2 flex h-5 w-5 items-center justify-center rounded-full border',
          isChecked ? 'border-purple-500' : 'border-gray-300',
          !disabled && 'cursor-pointer'
        )}
        onClick={handleChange}
      >
        {isChecked && <div className='h-3 w-3 rounded-full bg-purple-500' />}
      </Box>
      <label
        className={clsx('text-theme', !disabled && 'cursor-pointer')}
        onClick={!disabled ? handleChange : undefined}
      >
        {label}
      </label>
    </Box>
  );
};

export default RadioOption;
