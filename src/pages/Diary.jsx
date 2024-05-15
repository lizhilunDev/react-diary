import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';
import { useEffect, useState, useContext } from 'react';
import { DiaryStateContext } from '../App';
import useDiary from '../hooks/useDiary';
import { getStringDate } from '../utils/get-string-date';
import useTitle from '../hooks/useTitle';

const Diary = () => {
  const { id } = useParams();
  useTitle(`${id}번 일기 상세보기`);

  const nav = useNavigate();

  const currentItem = useDiary(id);

  if (!currentItem) {
    return <div>데이터 로딩 중</div>;
  }

  const { emotionId, content, createdDate } = currentItem;
  const date = getStringDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${date} 기록`}
        leftChild={<Button text='< 뒤로가기' onClick={() => nav(-1)} />}
        rightChild={
          <Button text='수정하기' onClick={() => nav(`/edit/${id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
