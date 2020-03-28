import {
  Action,
  MUTE_ALL,
  UNMUTE_ONE,
  ADD_VIDEO,
  DELETE_VIDEO,
  SET_VIDEO,
  SET_API_KEY,
} from './actions';

const saveLocalStorage = (state: State) => {
  if (process.env.LOCAL_STORAGE_KEY)
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UNMUTE_ONE: {
      const { videoId } = action.payload;
      const lives = state.lives.map((live) => ({
        ...live,
        videoId: live.videoId,
        isMuted: live.videoId !== videoId,
      }));
      saveLocalStorage({ ...state, lives });

      return {
        ...state,
        lives,
      };
    }

    case MUTE_ALL: {
      const lives = state.lives.map((live) => ({
        ...live,
        videoId: live.videoId,
        isMuted: true,
      }));
      saveLocalStorage({ ...state, lives });

      return {
        ...state,
        lives,
      };
    }

    case ADD_VIDEO: {
      const { videoId, channelId } = action.payload;
      const lives = [...state.lives];
      if (lives.every((live) => live.videoId !== videoId)) {
        lives.push({
          videoId,
          channelId,
          isMuted: true,
          updatedAt: -1,
        });
        saveLocalStorage({ ...state, lives });
      }

      return {
        ...state,
        lives,
      };
    }

    case DELETE_VIDEO: {
      const { videoId, channelId } = action.payload;
      let lives = [...state.lives];

      if (
        lives.some(
          (live) => live.videoId === videoId || live.channelId === channelId,
        )
      ) {
        lives = lives.filter(
          (v) => !(v.videoId === videoId && v.channelId === channelId),
        );
        saveLocalStorage({ ...state, lives });
      }

      return {
        ...state,
        lives,
      };
    }

    case SET_VIDEO: {
      const { videoId, channelId } = action.payload;
      let lives = [...state.lives];

      if (
        channelId !== '' &&
        lives.some((live) => live.channelId === channelId)
      ) {
        lives = lives.map((v) =>
          v.channelId === channelId
            ? { ...v, videoId, updatedAt: new Date().getTime() }
            : { ...v },
        );
        saveLocalStorage({ ...state, lives });
      }

      return {
        ...state,
        lives,
      };
    }

    case SET_API_KEY: {
      const { apiKey } = action.payload;

      saveLocalStorage({ ...state, apiKey });

      return {
        ...state,
        apiKey,
      };
    }

    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      // eslint-disable-next-line no-unused-expressions
      _; // FIXME: ad-hoc for ts error

      return state;
    }
  }
};
