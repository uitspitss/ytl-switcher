import { Action, MUTE_ALL, UNMUTE_ONE, ADD_VIDEO } from './actions';
import { Live } from './types';

export type State = {
  lives: Live[];
};

export const initialState: State = {
  lives: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UNMUTE_ONE: {
      const { videoId } = action.payload;
      const lives = state.lives.map(live => ({
        videoId: live.videoId,
        isMuted: live.videoId !== videoId,
      }));

      return {
        ...state,
        lives,
      };
    }
    case MUTE_ALL: {
      const lives = state.lives.map(live => ({
        videoId: live.videoId,
        isMuted: true,
      }));

      return {
        ...state,
        lives,
      };
    }
    case ADD_VIDEO: {
      const { videoId } = action.payload;
      const lives = [...state.lives];
      if (lives.every(c => c.videoId !== videoId)) {
        lives.push({ videoId, isMuted: true });
        localStorage.setItem(
          'ytl_switcher',
          JSON.stringify({ lives: [...lives] }),
        );
      }

      return {
        ...state,
        lives,
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
