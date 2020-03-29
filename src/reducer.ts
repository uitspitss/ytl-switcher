import {
  Action,
  MUTE_ALL,
  UNMUTE_ONE,
  ADD_VIDEO,
  DELETE_VIDEO,
  SET_VIDEO,
  SET_API_KEY,
  SET_STATE,
} from './actions';
import db from '../db';

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_STATE: {
      const { payload } = action;

      return { ...state, ...payload.state };
    }

    case UNMUTE_ONE: {
      const { videoId } = action.payload;
      const lives = state.lives.map((live) => ({
        ...live,
        videoId: live.videoId,
        isMuted: live.videoId !== videoId,
      }));

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

      return {
        ...state,
        lives,
      };
    }

    case ADD_VIDEO: {
      const { videoId, channelId } = action.payload;
      const lives = [...state.lives];
      if (lives.every((live) => live.videoId !== videoId)) {
        const live = {
          videoId,
          channelId,
          isMuted: true,
          updatedAt: -1,
        };
        lives.push(live);
        db.addLive(live);
      }

      return {
        ...state,
        lives,
      };
    }

    case DELETE_VIDEO: {
      const { videoId } = action.payload;
      let lives = [...state.lives];

      const live = lives.find((v) => v.videoId === videoId);

      if (live) {
        lives = lives.filter((v) => v.videoId !== videoId);
        db.deleteLive(videoId);
      }

      return {
        ...state,
        lives,
      };
    }

    case SET_VIDEO: {
      const { videoId, channelId } = action.payload;
      let lives = [...state.lives];

      if (channelId === '') {
        return {
          ...state,
          lives,
        };
      }

      const live = lives.find((v) => v.channelId === channelId);

      if (live) {
        const l = {
          ...live,
          videoId,
          updatedAt: new Date().getTime(),
        };
        lives = lives.map((v) => (v.channelId === channelId ? l : v));
        db.updateLive(live);
      }

      return {
        ...state,
        lives,
      };
    }

    case SET_API_KEY: {
      const { apiKey } = action.payload;

      db.putApiKey(apiKey);

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
