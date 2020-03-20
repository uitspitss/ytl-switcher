import {
  Action,
  MUTE_ALL,
  UNMUTE_ONE,
  ADD_VIDEO,
  DELETE_VIDEO,
} from './actions';

export type State = {
  lives: Live[];
};

export const initialState: State = {
  lives: [],
};

const saveLocalStorage = (state: State) => {
  if (process.env.LOCAL_STORAGE_KEY)
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UNMUTE_ONE: {
      const { videoId } = action.payload;
      const lives = state.lives.map(live => ({
        videoId: live.videoId,
        isMuted: live.videoId !== videoId,
      }));
      saveLocalStorage({ lives });

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
      saveLocalStorage({ lives });

      return {
        ...state,
        lives,
      };
    }
    case ADD_VIDEO: {
      const { videoId } = action.payload;
      const lives = [...state.lives];
      if (lives.every(live => live.videoId !== videoId)) {
        lives.push({ videoId, isMuted: true });
        saveLocalStorage({ lives });
      }

      return {
        ...state,
        lives,
      };
    }
    case DELETE_VIDEO: {
      const { videoId } = action.payload;
      let lives = [...state.lives];

      if (lives.some(live => live.videoId === videoId)) {
        lives = lives.filter(v => v.videoId !== videoId);
        saveLocalStorage({ lives });
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
