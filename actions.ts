export const MUTE_ALL = 'MUTE_ALL' as const;
export const UNMUTE_ONE = 'UNMUTE_ONE' as const;
export const ADD_VIDEO = 'ADD_VIDEO' as const;

export const muteAll = (channelId: string) => ({
  type: MUTE_ALL,
  payload: {
    channelId,
  },
});

export const unmuteOne = (channelId: string) => ({
  type: UNMUTE_ONE,
  payload: {
    channelId,
  },
});

export const addVideo = (channelId: string) => ({
  type: ADD_VIDEO,
  payload: {
    channelId,
  },
});

export type Action =
  | ReturnType<typeof muteAll>
  | ReturnType<typeof unmuteOne>
  | ReturnType<typeof addVideo>;
