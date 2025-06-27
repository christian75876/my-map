import React, { useState } from 'react';
import Box from '@/components/atoms/box';
import Select from '@/components/atoms/select/SimpleSelect';
import Button from '@/components/atoms/button/SimpleButton';
import Input from '@/components/atoms/input/SimpleInput';
import Icon from '@/components/atoms/icon/SimpleIcon';
import Typography from '@/components/atoms/typography';

interface SelectOption {
  id: string;
  name: string;
}

interface SelectWithAddProps {
  label: string;
  placeholder?: string;
  options: SelectOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  error?: string | null;
  newItemName?: string;
  newItemPlaceholder?: string;
  addButtonLabel?: string;
  cancelButtonLabel?: string;
  handleNewItemNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNewItem?: () => Promise<void>;
  showAddItem?: boolean;
  setShowAddItem?: (value: React.SetStateAction<boolean>) => void;
  required?: boolean;
  width?: string;
  className?: string;
  isRequired?: boolean;
  id?: string;
}

export default function SelectWithAdd({
  label,
  placeholder = 'Seleccionar',
  options,
  selectedValue,
  onChange,
  onBlur,
  error,
  newItemName = '',
  newItemPlaceholder = 'Nombre del nuevo ítem',
  addButtonLabel = 'Agregar',
  cancelButtonLabel = 'Cancelar',
  handleNewItemNameChange,
  handleAddNewItem,
  showAddItem = false,
  setShowAddItem,
  required = false,
  width = 'w-full',
  className = '',
  isRequired = false,
  id
}: SelectWithAddProps) {
  // Use provided state or internal state depending on if external controls are provided
  const [internalShowAddNew, setInternalShowAddNew] = useState(false);
  const [internalNewItemName, setInternalNewItemName] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  // Use either provided props or internal state
  const isAdding = showAddItem !== undefined ? showAddItem : internalShowAddNew;
  const itemName =
    newItemName !== undefined ? newItemName : internalNewItemName;

  const toggleAddNew = (show: boolean) => {
    if (setShowAddItem) {
      setShowAddItem(show);
    } else {
      setInternalShowAddNew(show);
    }
  };

  const updateItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleNewItemNameChange) {
      handleNewItemNameChange(e);
    } else {
      setInternalNewItemName(e.target.value);
    }
  };

  const addItem = async () => {
    if (!handleAddNewItem) return;

    try {
      setIsAddingItem(true);
      await handleAddNewItem();

      // Only reset internal state if we're managing it
      if (!setShowAddItem) {
        setInternalShowAddNew(false);
        setInternalNewItemName('');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setIsAddingItem(false);
    }
  };

  // Used for accessibility
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const labelId = `${selectId}-label`;

  return (
    <Box className={`mb-4 ${className}`}>
      {label && (
        <div id={labelId}>
          <Typography className='text-theme mb-2 block font-medium'>
            {label} {isRequired && <span className='text-red-500'>*</span>}
          </Typography>
        </div>
      )}

      {!isAdding ? (
        <Box className={`relative ${width}`}>
          <div className='flex items-center gap-2'>
            <Select
              id={selectId}
              value={selectedValue}
              onChange={onChange}
              className={`${error ? 'border-red-500' : ''}`}
              onBlur={onBlur}
              required={required}
              aria-labelledby={labelId}
            >
              <option value=''>{placeholder}</option>
              {options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            <Button
              type='button'
              variant='transparent'
              className='mb-4 h-[45px] px-2 py-1'
              onClick={() => toggleAddNew(true)}
              aria-label={`Agregar nuevo ${label.toLowerCase()}`}
            >
              <Icon name='bx-plus' /> Nuevo
            </Button>
          </div>

          {error && (
            <Typography className='mt-1 text-sm text-red-500'>
              {error}
            </Typography>
          )}
        </Box>
      ) : (
        <Box className={`relative flex flex-col ${width}`}>
          <Box className='flex gap-2'>
            <Input
              id={`${selectId}-new-input`}
              placeholder={newItemPlaceholder}
              className='flex-grow'
              value={itemName}
              onChange={updateItemName}
              required
              aria-label={newItemPlaceholder}
            />
            <Button
              type='button'
              onClick={addItem}
              className='mt-1 h-[45px] min-w-[85px]'
              aria-label={addButtonLabel}
              disabled={isAddingItem}
            >
              {isAddingItem ? (
                <Icon name='bx-loader-alt' className='animate-spin'></Icon>
              ) : (
                addButtonLabel
              )}
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => toggleAddNew(false)}
              className='mt-1 h-[45px]'
              aria-label={cancelButtonLabel}
              disabled={isAddingItem}
            >
              {cancelButtonLabel}
            </Button>
          </Box>
          {error && (
            <Typography className='absolute text-sm text-red-500'>
              {error}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
