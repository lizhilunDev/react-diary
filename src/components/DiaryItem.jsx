import { getEmotionImage } from './../utils/get-emotion-image';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './DiaryItem.css';

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const image = getEmotionImage(emotionId);

  const nav = useNavigate();

  return (
    <div className='DiaryItem'>
      <div
        className={`img-section img-section-${emotionId}`}
        onClick={() => nav(`/diary/${id}`)}
      >
        <img src={image} alt='' />
      </div>
      <div className='info-section' onClick={() => nav(`/diary/${id}`)}>
        <div className='created-date'>
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className='content'>{content}</div>
      </div>
      <div className='button-section'>
        <Button text='수정하기' onClick={() => nav(`/edit/${id}`)} />
      </div>
    </div>
  );
};

export default DiaryItem;
