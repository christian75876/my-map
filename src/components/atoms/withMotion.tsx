import { motion, MotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';

/**
 * Higher Order Component that adds motion capabilities to any component
 * @param Component The component to enhance with motion
 * @returns A motion-enhanced version of the component
 */
function withMotion<T extends React.ElementType>(Component: T) {
  type ComponentProps = React.ComponentPropsWithoutRef<T>;
  type WithMotionProps = ComponentProps & MotionProps;

  const MotionComponent = forwardRef<HTMLElement, WithMotionProps>(
    (props, ref) => {
      const MotionFactory = motion(Component);
      return <MotionFactory ref={ref} {...props} />;
    }
  );

  // Set display name for better debugging
  let componentName = 'Component';

  // Safe type checking for React components
  if (typeof Component === 'function') {
    // For function components and class components
    componentName = Component.name || 'Component';
  } else if (typeof Component === 'string') {
    // For intrinsic elements like 'div', 'span', etc
    componentName = Component.charAt(0).toUpperCase() + Component.slice(1);
  }

  MotionComponent.displayName = `Motion${componentName}`;

  return MotionComponent;
}

export default withMotion;
