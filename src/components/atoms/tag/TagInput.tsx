import { useState, KeyboardEvent, useRef, forwardRef } from 'react';
import clsx from 'clsx';
import Box from '../box/SimpleBox';
import ErrorMessage from '../error-message/SimpleErrorMessage';
import Icon from '../icon/SimpleIcon';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      tags,
      onChange,
      placeholder = 'Agregar etiqueta',
      error,
      disabled = false,
      className
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTag = () => {
      if (inputValue.trim() === '') return;

      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
      inputRef.current?.focus();
    };

    const handleRemoveTag = (tagToRemove: string) => {
      onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        handleAddTag();
      } else if (
        e.key === 'Backspace' &&
        inputValue === '' &&
        tags.length > 0
      ) {
        handleRemoveTag(tags[tags.length - 1]);
      }
    };

    return (
      <Box ref={ref} className={clsx('mb-4 w-full', className)}>
        <div
          className={clsx(
            'bg-theme flex min-h-[48px] flex-wrap items-center rounded-lg border p-2 focus-within:ring-2',
            error
              ? 'border-red-500 focus-within:ring-red-500'
              : 'border-accent-dark focus-within:ring-primary',
            disabled && 'opacity-50'
          )}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            type='text'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleAddTag}
            className='min-w-[80px] flex-grow bg-transparent p-1 outline-none'
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={disabled}
          />
        </div>
        <div className='mt-2 flex'>
          {tags.map((tag, index) => (
            <div
              key={index}
              className='bg-primary-transparent m-1 flex items-center justify-center rounded-full px-6 py-2 text-primary hover:bg-primary/30'
            >
              <span className='text-lg font-semibold capitalize'>{tag}</span>
              {!disabled && (
                <button
                  type='button'
                  className='ml-1 flex'
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Icon name='bx-x' className='leading-0' />
                </button>
              )}
            </div>
          ))}
        </div>

        {error && <ErrorMessage message={error} />}
      </Box>
    );
  }
);

TagInput.displayName = 'TagInput';

export default TagInput;
