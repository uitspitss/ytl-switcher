import React, {
  FC,
  createContext,
  useReducer,
  useEffect,
  Dispatch,
} from 'react';
import { reducer } from './reducer';
import { Action, SET_STATE } from './actions';
import db from './db';

const initialState: State = {
  lives: [],
  apiKey: '',
  isLoading: true,
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchDb = async () => {
      const s = await db.fetchData();

      dispatch({
        type: SET_STATE,
        payload: { state: { ...s, isLoading: false } },
      });
    };
    fetchDb();
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
