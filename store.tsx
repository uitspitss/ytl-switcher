import React, { FC, createContext, useReducer, Dispatch } from 'react';
import { reducer, initialState, State } from './reducer';
import { Action } from './actions';

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

const initializeState = () => {
  if (typeof window === 'undefined') return { lives: [] };
  const storage = localStorage.getItem('ytl_switcher');
  if (!storage) {
    return { lives: [] };
  }

  return JSON.parse(storage);
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
