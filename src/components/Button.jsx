import { BUTTON_TYPE } from '../constants/button';
import './Button.css';

const Button = ({ text, type = BUTTON_TYPE.SECONDARY, onClick }) => {
  return (
    <button className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
