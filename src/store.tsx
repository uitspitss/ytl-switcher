import React, { FC, createContext, useReducer, Dispatch } from 'react';
import { reducer } from './reducer';
import { Action } from './actions';

const initialState: State = {
  lives: [],
  apiKey: '',
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

const initializeState = () => {
  if (typeof window === 'undefined') return { lives: [], apiKey: '' };
  if (!process.env.LOCAL_STORAGE_KEY) return { lives: [], apiKey: '' };
  const storage = localStorage.getItem(process.env.LOCAL_STORAGE_KEY);
  if (!storage) {
    return { lives: [], apiKey: '' };
  }

  const state = JSON.parse(storage);
  for (const key of Object.keys(initialState)) {
    if (!(key in state)) {
      state[key] = initialState[key as keyof State];
    }
  }

  return state;
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
