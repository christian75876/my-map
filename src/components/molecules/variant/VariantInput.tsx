import { useRef, useState } from 'react';
import Box from '@/components/atoms/box/SimpleBox';
import Input from '@/components/atoms/input/SimpleInput';
import Button from '@/components/atoms/button/SimpleButton';
import Icon from '@/components/atoms/icon/SimpleIcon';
import Typography from '@/components/atoms/typography/SimpleTypography';
import ErrorMessage from '@/components/atoms/error-message/SimpleErrorMessage';

import Image from 'next/image';
import { MediaFile } from '@/common/components/mediaManager/MediaManager.types';
import { IconButton } from '@/components/atoms/button';
import { ProductVariantMediaInterface } from '@/features/products/types/product.types';

// Interfaz para archivo de variante (usada para uploads locales)
export interface VariantFile extends File {
  id: string;
  preview: string;
  isMain: boolean;
}

// Interfaz para variante - alineada con ProductVariantInterface
export interface Variant {
  id: string;
  name: string;
  quantity: number;
  isDefault: boolean;
  files: VariantFile[]; // Archivos locales para upload
  variantTypeId: string;
  variantTypeValue?: string;
  media?: ProductVariantMediaInterface[]; // Media existente del API
}

// Interfaz para respuesta de variante
export interface VariantResponse {
  id: string;
  variantTypeValue: string;
  quantity: number;
  isDefault: boolean;
  variantTypeId: string;
  media?: ProductVariantMediaInterface[];
}

interface VariantInputProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
  error?: string;
  variantErrors?: { [key: string]: { [key: string]: string } };
  onMediaClick?: (variantId: string) => void;
  variantMediaFiles?: MediaFile[];
  selectedVariantType?: string;
}

const VariantInput = ({
  variants,
  onChange,
  error,
  variantErrors,
  onMediaClick,
  variantMediaFiles = [],
  selectedVariantType
}: VariantInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleImageError = (variantId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [variantId]: true
    }));
  };

  const handleAddVariant = () => {
    // Only add new variant if a variant type is selected
    if (!selectedVariantType) {
      return; // Don't proceed if no variant type is selected
    }

    const variantId = `variant-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const newVariant: Variant = {
      id: variantId,
      variantTypeId: selectedVariantType,
      name: '',
      quantity: 1,
      isDefault: variants.length === 0,
      files: [],
      media: []
    };

    onChange([...variants, newVariant]);
  };

  const handleRemoveVariant = (id: string) => {
    const newVariants = variants.filter(v => v.id !== id);

    // If we removed the default variant, set the first one as default
    if (newVariants.length > 0 && variants.find(v => v.id === id)?.isDefault) {
      newVariants[0].isDefault = true;
    }

    onChange(newVariants);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    onChange(variants.map(v => (v.id === id ? { ...v, quantity } : v)));
  };

  const handleNameChange = (id: string, name: string) => {
    onChange(variants.map(v => (v.id === id ? { ...v, name } : v)));
  };

  const handleAddFiles = (id: string, files: FileList) => {
    onChange(
      variants.map(v => {
        if (v.id === id) {
          const newFiles: VariantFile[] = Array.from(files).map(file => ({
            ...file,
            id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            preview: URL.createObjectURL(file),
            isMain: v.files.length === 0
          }));
          return {
            ...v,
            files: [...v.files, ...newFiles],
            media: []
          };
        }
        return v;
      })
    );
  };

  // Function to get main image for a variant
  const getMainImage = (variantId: string): string | undefined => {
    // Primero buscar en el media manager
    const mediaFile = variantMediaFiles.find(
      file => file.variantId === variantId && file.isMain
    );

    if (mediaFile?.preview) {
      return mediaFile.preview;
    }

    // Si no lo encontramos en el media manager, buscar en media original de la API
    const currentVariant = variants.find(v => v.id === variantId);

    if (currentVariant?.media && currentVariant.media.length > 0) {
      const mainApiMedia = currentVariant.media.find(m => m.is_main === true);
      if (mainApiMedia?.path) {
        return mainApiMedia.path;
      }

      // Si no hay main marcado, usar el primero
      if (currentVariant.media[0]?.path) {
        return currentVariant.media[0].path;
      }
    }

    // Si no hay media de ningún tipo, buscar en los archivos locales
    if (currentVariant?.files && currentVariant.files.length > 0) {
      const variantFile = currentVariant.files[0];
      if (variantFile) {
        return URL.createObjectURL(variantFile);
      }
    }

    return undefined;
  };

  return (
    <Box className='mb-4 w-full'>
      <div className='flex flex-wrap gap-8'>
        {variants.map(variant => (
          <div
            key={variant.id}
            className='flex w-[300px] flex-col overflow-hidden rounded-lg border border-accent-dark p-6 shadow-sm'
          >
            {/* Image section */}
            <div className='relative flex aspect-square max-h-[150px] items-center justify-center'>
              {getMainImage(variant.id) && !imageErrors[variant.id] ? (
                <Image
                  onErrorCapture={() => handleImageError(variant.id)}
                  src={getMainImage(variant.id) as string}
                  alt={variant.name || 'Variant image'}
                  className='h-full w-full rounded-lg object-cover'
                  fill
                />
              ) : imageErrors[variant.id] ? (
                <div className='flex h-full w-full flex-col items-center justify-center rounded-lg bg-accent-dark'>
                  <Icon
                    name='bx-image-alt'
                    size={32}
                    className='font-bold text-primary'
                  />
                  <Typography className='mt-1 text-center text-lg font-bold text-neutral-white'>
                    Imagen no <br /> disponible
                  </Typography>
                </div>
              ) : (
                <div
                  className='flex h-full w-full flex-col items-center justify-center rounded-lg bg-accent-dark'
                  onClick={() => !onMediaClick && fileInputRef.current?.click()}
                >
                  <Icon name='bx-image' size={24} className='text-gray-400' />
                  <Typography className='mt-2 text-sm text-gray-500'>
                    Agregar imagen
                  </Typography>
                  {!onMediaClick && (
                    <input
                      ref={fileInputRef}
                      type='file'
                      multiple
                      accept='image/*'
                      aria-label='Upload variant images'
                      className='hidden'
                      onChange={e =>
                        e.target.files &&
                        handleAddFiles(variant.id, e.target.files)
                      }
                    />
                  )}
                </div>
              )}
              {variant.isDefault && (
                <div className='absolute top-2 left-2 rounded-full bg-purple-600 px-2 py-1 text-xs text-white'>
                  Principal
                </div>
              )}
            </div>

            {/* Content section */}
            <div className='px-1 py-4'>
              {/* Quantity */}
              <div className='mb-3'>
                <Typography className='mb-1 text-sm text-gray-200'>
                  Cantidad
                </Typography>
                <div className='flex items-center gap-2'>
                  <div className='flex flex-grow items-center'>
                    <Input
                      type='number'
                      min='1'
                      value={variant.quantity}
                      onChange={e =>
                        handleQuantityChange(
                          variant.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className='bg-dark-1 w-full rounded-md border border-gray-700 text-white'
                      aria-label='Cantidad de variante'
                    />
                  </div>
                  {onMediaClick && (
                    <IconButton
                      type='button'
                      shape='square'
                      icon='bx-add-to-queue'
                      variant='transparent'
                      className='mb-3 flex min-h-[40px] min-w-[40px]'
                      onClick={() => {
                        // console.log(variant.id, 'variant id---------');
                        onMediaClick(variant.id);
                      }}
                      aria-label='Administrar imágenes'
                      title='Administrar imágenes'
                    />
                  )}
                </div>
                {variantErrors?.[variant.id]?.quantity && (
                  <ErrorMessage message={variantErrors[variant.id].quantity} />
                )}
              </div>

              {/* Name */}
              <div className='mb-3'>
                <Typography className='mb-1 text-sm text-gray-200'>
                  Nombre de variante
                </Typography>
                <Input
                  type='text'
                  value={variant.name}
                  onChange={e => handleNameChange(variant.id, e.target.value)}
                  placeholder='Escribir nombre'
                  className='bg-dark-1 w-full border border-gray-700 text-white'
                  error={variantErrors?.[variant.id]?.name}
                />
              </div>

              {/* Delete button */}
              <Button
                type='button'
                variant='outline'
                className='flex w-full items-center justify-center gap-2 border-purple-400 py-1.5 text-purple-400'
                onClick={() => handleRemoveVariant(variant.id)}
                aria-label='Eliminar variante'
              >
                <Icon name='bx-trash' />
                <span>Eliminar</span>
              </Button>
            </div>
          </div>
        ))}

        {/* Add variant card */}
        <div
          className={`flex h-[456px] w-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed ${
            selectedVariantType
              ? 'cursor-pointer border-gray-700'
              : 'cursor-not-allowed border-gray-700'
          }`}
          onClick={handleAddVariant}
          aria-disabled={!selectedVariantType}
        >
          <Button
            type='button'
            variant='primary'
            className={`te selectedVariantType ? 'bg-purple-600' : 'bg-opacity-50 bg-purple-600' } mb-2 cursor-not-allowed rounded-md px-4 py-2`}
            aria-label='Añadir nueva variante'
            disabled={!selectedVariantType}
          >
            Añadir
          </Button>
          {!selectedVariantType && (
            <Typography className='px-4 text-center text-sm text-gray-400'>
              Selecciona un tipo de variante primero
            </Typography>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </Box>
  );
};

export default VariantInput;
