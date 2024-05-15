import './Viewer.css';
import { getEmotionImage } from '../utils/get-emotion-image';
import { emotionList } from '../constants/emotion';

const Viewer = ({ emotionId, content }) => {
  const EmotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className='Viewer'>
      <section className='img-section'>
        <h4>오늘의 감정</h4>
        <div className={`emotion-img-wrapper emotion-img-wrapper-${emotionId}`}>
          <img src={getEmotionImage(emotionId)} alt='' />
          <div>{EmotionItem.emotionName}</div>
        </div>
      </section>
      <section className='content-section'>
        <h4>오늘의 일기</h4>
        <div className='content-wrapper'>
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
