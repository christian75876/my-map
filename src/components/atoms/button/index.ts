import Button from './SimpleButton';
import IconButton from './IconButton';
import withMotion from '../withMotion';

const MotionButton = withMotion(Button);
const MotionIconButton = withMotion(IconButton);

export { Button, IconButton, MotionButton, MotionIconButton };
export default Button;
