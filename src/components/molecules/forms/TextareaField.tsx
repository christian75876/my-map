import Box from '@/components/atoms/box/SimpleBox';
import Textarea from '@/components/atoms/textarea/SimpleTextarea';
import Label from '@/components/atoms/label/SimpleLabel';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import clsx from 'clsx';

interface TextareaFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  showLabel?: boolean;
  rows?: number;
  textAreaClassName?: React.HTMLAttributes<HTMLTextAreaElement>['className'];
  resizable?: boolean;
}

const TextareaField = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  showLabel = false,
  rows = 4,
  textAreaClassName,
  resizable = false
}: TextareaFieldProps<T>) => {
  return (
    <Box className='flex w-full flex-col gap-2'>
      {showLabel && (
        <Label htmlFor={name} className='text-md text-theme block'>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            className={clsx(textAreaClassName, !resizable && 'resize-none')}
            id={name}
            placeholder={placeholder}
            rows={rows}
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />
    </Box>
  );
};

export default TextareaField;
