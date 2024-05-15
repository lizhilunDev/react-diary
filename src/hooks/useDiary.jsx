import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

const useDiary = (id) => {
  const items = useContext(DiaryStateContext);
  const [currentItem, setCurrentItem] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const result = items.find((item) => String(item.id) === String(id));

    if (!result) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
    }

    setCurrentItem(result);
  }, [id, items]);

  return currentItem;
};

export default useDiary;
