import { ReactNode } from 'react';

import Box, { MotionBox } from '@/components/atoms/box';
import Button from '@/components/atoms/button';
import { ButtonVariant } from '@/components/atoms/button/SimpleButton';
import clsx from 'clsx';
import { AnimatePresence } from 'motion/react';

type TSimpleDropdown = {
  buttonLabel?: string;
  values?: {
    label: string;
    action: () => void;
    disabled?: boolean;
  }[];
  className: string;
  buttonVariant: ButtonVariant;
  rightIcon?: ReactNode;
  isOpen: boolean;
  disabled?: boolean;
  onHandleToggle: () => void;
};

const SimpleDropdown = ({
  buttonLabel = 'my button',
  values,
  className,
  buttonVariant,
  rightIcon,
  isOpen,
  onHandleToggle,
  disabled
}: TSimpleDropdown) => {
  const DropDownContent = () => {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className='absolute top-[130%] left-0 z-10 flex flex-col rounded-lg bg-accent-dark'
      >
        {values?.map((value, index) => (
          <Button
            className={clsx(
              'rounded-none border-t border-t-[#404040] !bg-transparent hover:*:text-primary',
              {
                'rounded-b-lg': index === values.length - 1,
                'rounded-t-lg': index === 0
              }
            )}
            disabled={value.disabled}
            onClick={value.action}
            key={value.label}
          >
            <span className='text-sm font-semibold capitalize transition-colors'>
              {value.label}
            </span>
          </Button>
        ))}
      </MotionBox>
    );
  };

  return (
    <Box className='relative'>
      <Button
        className={className}
        variant={buttonVariant}
        rightIcon={rightIcon}
        onClick={onHandleToggle}
        disabled={disabled}
      >
        <Box className='text-base font-semibold capitalize'>{buttonLabel}</Box>
      </Button>
      <AnimatePresence>{isOpen && <DropDownContent />}</AnimatePresence>
    </Box>
  );
};

export default SimpleDropdown;
