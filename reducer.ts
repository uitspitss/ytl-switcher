import { Action, MUTE_ALL, UNMUTE_ONE, ADD_VIDEO } from './actions';
import { Video } from './types';

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
    case UNMUTE_ONE: {
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
    case MUTE_ALL: {
      const videos = state.videos.map(v => ({
        videoId: v.videoId,
        isMuted: true,
      }));

      return {
        ...state,
        videos,
      };
    }
    case ADD_VIDEO: {
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
    default: {
      // FIXME: disable bug
      // // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const _: never = action;

      return state;
    }
  }
};
