import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Button from '../components/Button';
import { BUTTON_TYPE } from '../constants/button';
import { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import useDiary from '../hooks/useDiary';
import useTitle from '../hooks/useTitle';

const Edit = () => {
  const { id } = useParams();
  const currentItem = useDiary(id);
  useTitle(`${id}번 일기 수정하기`);

  const nav = useNavigate();

  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const onClickDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    onDelete({ id });
    nav('/', { replace: true });
  };

  const onSubmit = (input) => {
    if (!window.confirm('정말 수정하시겠습니까?')) return;

    onUpdate({
      id,
      emotionId: input.emotionId,
      content: input.content,
      createdDate: input.createdDate.getTime(),
    });
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title='일기 수정하기'
        leftChild={<Button text='< 뒤로 가기' onClick={() => nav(-1)} />}
        rightChild={
          <Button
            text='삭제하기'
            type={BUTTON_TYPE.WARNING}
            onClick={onClickDelete}
          />
        }
      />
      <Editor ititData={currentItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
