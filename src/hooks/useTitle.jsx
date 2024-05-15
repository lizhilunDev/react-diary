import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName('title')[0];
    $title.innerText = `감정 일기장 | ${title}`;
  }, [title]);
};

export default useTitle;
