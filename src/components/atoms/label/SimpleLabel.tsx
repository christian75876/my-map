type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label className={`block ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
