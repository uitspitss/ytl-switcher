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
      isMuted: false,
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
    case ActionType.ADD_VIDEO: {
      const { videoId } = action.payload;
      const videos = [...state.videos];
      if (videos.every(v => v.videoId !== videoId)) {
        videos.push({ videoId, isMuted: true });
        localStorage.setItem(
          'video_ids',
          JSON.stringify(videos.map(v => v.videoId)),
        );
      }

      return {
        ...state,
        videos,
      };
    }
    default:
      return state;
  }
};
