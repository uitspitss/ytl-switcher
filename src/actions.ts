export const MUTE_ALL = 'MUTE_ALL' as const;
export const UNMUTE_ONE = 'UNMUTE_ONE' as const;
export const ADD_VIDEO = 'ADD_VIDEO' as const;
export const DELETE_VIDEO = 'DELETE_VIDEO' as const;
export const SET_API_KEY = 'SET_API_KEY' as const;

export const muteAll = (videoId: string) => ({
  type: MUTE_ALL,
  payload: {
    videoId,
  },
});

export const unmuteOne = (videoId: string) => ({
  type: UNMUTE_ONE,
  payload: {
    videoId,
  },
});

export const addVideo = (videoId: string) => ({
  type: ADD_VIDEO,
  payload: {
    videoId,
  },
});

export const deleteVideo = (videoId: string) => ({
  type: DELETE_VIDEO,
  payload: {
    videoId,
  },
});

export const setApiKey = (apiKey: string) => ({
  type: SET_API_KEY,
  payload: {
    apiKey,
  },
});

export type Action =
  | ReturnType<typeof muteAll>
  | ReturnType<typeof unmuteOne>
  | ReturnType<typeof addVideo>
  | ReturnType<typeof deleteVideo>
  | ReturnType<typeof setApiKey>;
