import './EmotionItem.css';
import { getEmotionImage } from '../utils/get-emotion-image';

const EmotionItem = ({
  emotionId,
  emotionName,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`EmotionItem ${
        isSelected ? `EmotionItem-on-${emotionId}` : ''
      }`}
    >
      <img className='emotion-img' src={getEmotionImage(emotionId)} alt='' />
      <div className='emotion-name'>{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
