import Box from '@/components/atoms/box/SimpleBox';
import Typography from '@/components/atoms/typography/SimpleTypography';

import Image from 'next/image';

interface LogoWithTextProps {
  logo?: string;
  title: string;
  subtitle: string;
  size?: 'sm' | 'md' | 'lg'; // Tamaños predefinidos
}

const sizeClasses = {
  sm: { logo: 'w-10', title: 'text-lg', subtitle: 'text-sm' },
  md: { logo: 'w-16', title: 'text-xl', subtitle: 'text-lg' },
  lg: { logo: 'w-24', title: 'text-2xl', subtitle: 'text-xl' }
};

const LogoWithText = ({
  logo = '/images/logo.png',
  title,
  subtitle,
  size = 'md'
}: LogoWithTextProps) => {
  return (
    <Box className='flex items-center space-x-3'>
      <Image
        src={logo}
        alt='Logo DeUna Dropshipping'
        width={100}
        height={100}
        className={`${sizeClasses[size].logo}`}
      />
      <Box>
        <Typography
          variant='p'
          className={`leading-tight font-semibold text-neutral-dark ${sizeClasses[size].title}`}
        >
          {title}
        </Typography>
        <Typography
          variant='p'
          className={`text-neutral-dark ${sizeClasses[size].subtitle}`}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default LogoWithText;
