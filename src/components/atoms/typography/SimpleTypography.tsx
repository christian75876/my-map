interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  textColor?: string;
  children: React.ReactNode;
}

const Typography = ({
  variant = 'p',
  className,
  textColor = 'text-theme',
  children
}: TypographyProps) => {
  const Tag: React.ElementType = variant || 'p';

  return <Tag className={`${textColor} ${className}`}>{children}</Tag>;
};

export default Typography;
