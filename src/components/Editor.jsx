import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { BUTTON_TYPE } from '../constants/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../constants/emotion';
import { getStringDate } from '../utils/get-string-date';

const Editor = ({ onSubmit, ititData }) => {
  const nav = useNavigate();

  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmit = () => {
    onSubmit(input);
  };

  useEffect(() => {
    if (!ititData) return;
    setInput({
      createdDate: new Date(ititData.createdDate),
      emotionId: ititData.emotionId,
      content: ititData.content,
    });
  }, [ititData]);

  return (
    <div className='Editor'>
      <section className='date-section'>
        <h4>오늘의 날짜</h4>
        <input
          type='date'
          value={getStringDate(input.createdDate)}
          name='createdDate'
          onChange={onChange}
        />
      </section>
      <section className='emotion-section'>
        <h4>오늘의 감정</h4>
        <div className='emotion-list-wrapper'>
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChange({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className='content-section'>
        <h4>오늘의 일기</h4>
        <textarea
          placeholder='오늘은 어땠나요?'
          value={input.content}
          name='content'
          onChange={onChange}
        />
      </section>
      <section className='button-section'>
        <Button text='취소하기' onClick={() => nav(-1)} />
        <Button
          onClick={onClickSubmit}
          type={BUTTON_TYPE.PRIMARY}
          text='작성완료'
        />
      </section>
    </div>
  );
};

export default Editor;
