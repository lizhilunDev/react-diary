import './DiaryList.css';
import Button from './Button';
import { BUTTON_TYPE } from '../constants/button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DiaryList = ({ data }) => {
  const nav = useNavigate();

  const [sortType, setSortType] = useState('latest');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedData = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'latest') {
        return Number(b.createdDate - a.createdDate);
      } else {
        return Number(a.createdDate - b.createdDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <div className='DiaryList'>
      <div className='menu-bar'>
        <select onChange={onChangeSortType}>
          <option value='latest'>최신순</option>
          <option value='oldest'>오래된 순</option>
        </select>
        <Button
          text='새로운 일기 쓰기'
          type={BUTTON_TYPE.PRIMARY}
          onClick={() => nav('/new')}
        />
      </div>
      <div className='list-wrapper'>
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
