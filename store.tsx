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

const getVideosLS = () => {
  if (typeof window === 'undefined') return { channels: [] };
  const channels = localStorage.getItem('ytl_switcher_channels');
  if (!channels) {
    return { channels: [] };
  }

  return {
    channels: JSON.parse(channels).map((cid: string) => ({
      channelId: cid,
      isMuted: true,
    })),
  };
};

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, getVideosLS);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
