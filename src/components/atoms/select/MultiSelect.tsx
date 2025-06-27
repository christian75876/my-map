import { useState, useRef, useEffect, forwardRef } from 'react';
import Box from '../box/SimpleBox';
import ErrorMessage from '../error-message/SimpleErrorMessage';
import Icon from '../icon/SimpleIcon';
import clsx from 'clsx';

export interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selectedIds: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      selectedValues,
      onChange,
      placeholder = 'Seleccionar opciones',
      error,
      disabled = false,
      className
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOption = (id: string) => {
      const newSelection = selectedValues.includes(id)
        ? selectedValues.filter(val => val !== id)
        : [...selectedValues, id];
      onChange(newSelection);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const selectedOptions = options.filter(option =>
      selectedValues.includes(option.id)
    );

    return (
      <Box ref={ref} className={clsx('relative mb-4 w-full', className)}>
        <div
          ref={dropdownRef}
          className={clsx(
            'bg-theme text-theme w-full rounded-lg border',
            error
              ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500'
              : 'border-accent-dark focus-within:ring-2 focus-within:ring-primary',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
        >
          <div
            className='flex min-h-[48px] flex-wrap items-center gap-2 p-2'
            onClick={() => !disabled && setIsOpen(!isOpen)}
          >
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <div
                  key={option.id}
                  className='flex items-center rounded-md bg-purple-100 px-2 py-1 text-purple-800'
                >
                  <span className='text-sm'>{option.name}</span>
                  <button
                    type='button'
                    title='Eliminar'
                    className='ml-1'
                    onClick={e => {
                      e.stopPropagation();
                      toggleOption(option.id);
                    }}
                  >
                    <Icon name='bx-x' />
                  </button>
                </div>
              ))
            ) : (
              <span className='px-2 text-gray-500'>{placeholder}</span>
            )}
          </div>

          <div className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform'>
            <Icon name={isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} />
          </div>

          {isOpen && !disabled && (
            <div className='bg-theme absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 shadow-lg'>
              {options.length > 0 ? (
                options.map(option => (
                  <div
                    key={option.id}
                    className={clsx(
                      'flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100',
                      selectedValues.includes(option.id) && 'bg-gray-100'
                    )}
                    onClick={() => toggleOption(option.id)}
                  >
                    <div className='mr-2'>
                      {selectedValues.includes(option.id) ? (
                        <Icon name='bx-check' className='text-purple-500' />
                      ) : (
                        <div className='h-4 w-4 rounded-sm border border-gray-400' />
                      )}
                    </div>
                    <span>{option.name}</span>
                  </div>
                ))
              ) : (
                <div className='px-4 py-2 text-gray-500'>
                  No hay opciones disponibles
                </div>
              )}
            </div>
          )}
        </div>
        {error && <ErrorMessage message={error} />}
      </Box>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
