import { Action, ActionType } from './actions';

export type Video = {
  videoId: string;
  isMuted: boolean;
};

export type State = {
  videos: Video[];
};

export const initialState: State = {
  videos: [
    {
      videoId: 'coYw-eVU0Ks',
      isMuted: true,
    },
    {
      videoId: 'UhfDDws5kt4',
      isMuted: true,
    },
  ],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.UNMUTE_ONE: {
      const { videoId } = action.payload;
      const videos = state.videos.map(v => ({
        videoId: v.videoId,
        isMuted: v.videoId !== videoId,
      }));

      return {
        ...state,
        videos,
      };
    }
    case ActionType.MUTE_ALL: {
      const videos = state.videos.map(v => ({
        videoId: v.videoId,
        isMuted: true,
      }));

      return {
        ...state,
        videos,
      };
    }
    default:
      return state;
  }
};
