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
  if (typeof window === 'undefined') return { videos: [] };
  const videoIds = localStorage.getItem('video_ids');
  if (!videoIds) {
    return { videos: [] };
  }

  return {
    videos: JSON.parse(videoIds).map((vid: string) => ({
      videoId: vid,
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
