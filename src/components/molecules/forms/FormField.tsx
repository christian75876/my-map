import Box from '@/components/atoms/box/SimpleBox';
import Input from '@/components/atoms/input/SimpleInput';
import Label from '@/components/atoms/label/SimpleLabel';
import clsx from 'clsx';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  showLabel?: boolean;
  valueAsNumber?: boolean;
  labelClassName?: React.HTMLAttributes<HTMLLabelElement>['className'];
  containerClassName?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const FormField = <T extends FieldValues>({
  label,
  name,
  control,
  type = 'text',
  placeholder,
  showLabel = false,
  valueAsNumber = false,
  labelClassName,
  containerClassName
}: FormFieldProps<T>) => {
  return (
    <Box className={clsx('flex w-full flex-col gap-2', containerClassName)}>
      {showLabel && (
        <Label
          htmlFor={name}
          className={clsx(`block ${labelClassName}`, {
            'text-theme': labelClassName == undefined
          })}
        >
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // Handle number conversion if needed
          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (valueAsNumber && type === 'number') {
              // Convert to number for number inputs when valueAsNumber is true
              const numValue = value === '' ? 0 : Number(value);
              field.onChange(numValue);
            } else {
              field.onChange(e);
            }
          };

          return (
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              error={fieldState.error?.message}
              value={field.value}
              onChange={onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          );
        }}
      />
    </Box>
  );
};

export default FormField;
