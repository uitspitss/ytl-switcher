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
  if (window) return { lives: [] };
  const state = localStorage.getItem('ytl_switcher');
  if (!state) {
    return { lives: [] };
  }

  return {
    lives: JSON.parse(state),
  };
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
