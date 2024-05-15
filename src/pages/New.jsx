import Button from '../components/Button';
import Editor from '../components/Editor';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import useTitle from '../hooks/useTitle';

const New = () => {
  useTitle('새 일기 쓰기');

  const nav = useNavigate();

  const { onCreate } = useContext(DiaryDispatchContext);

  const onSubmit = (input) => {
    onCreate({
      createdDate: input.createdDate.getTime(),
      emotionId: input.emotionId,
      content: input.content,
    });
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title='새 일기 쓰기'
        leftChild={<Button text='< 뒤로 가기' onClick={() => nav(-1)} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
