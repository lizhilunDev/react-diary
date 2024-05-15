import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useReducer, useState, useRef, createContext, useEffect } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';

const ACTION = Object.freeze({
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  INIT: 'INIT',
});

const reducer = (state, action) => {
  let nextState = '';

  switch (action.type) {
    case ACTION.INIT:
      nextState = action.data;
      break;
    case ACTION.CREATE:
      nextState = [...state, action.data];
      break;
    case ACTION.UPDATE:
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? { ...item, ...action.data }
          : item
      );
      break;
    case ACTION.DELETE:
      nextState = state.filter(
        (item) => String(item.id) !== String(action.data.id)
      );
      break;
    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
};

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  const onCreate = ({ createdDate, emotionId, content }) => {
    dispatch({
      type: ACTION.CREATE,
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = ({ id, emotionId, content, createdDate }) => {
    dispatch({
      type: ACTION.UPDATE,
      data: {
        id,
        emotionId,
        content,
        createdDate,
      },
    });
  };

  const onDelete = ({ id }) => {
    dispatch({
      type: ACTION.DELETE,
      data: {
        id,
      },
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;

    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({ type: ACTION.INIT, data: parsedData });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
