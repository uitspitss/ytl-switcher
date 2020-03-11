import { Action, MUTE_ALL, UNMUTE_ONE, ADD_VIDEO } from './actions';
import { Channel } from './types';

export type State = {
  channels: Channel[];
};

export const initialState: State = {
  channels: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case UNMUTE_ONE: {
      const { channelId } = action.payload;
      const channels = state.channels.map(c => ({
        channelId: c.channelId,
        isMuted: c.channelId !== channelId,
      }));

      return {
        ...state,
        channels,
      };
    }
    case MUTE_ALL: {
      const channels = state.channels.map(c => ({
        channelId: c.channelId,
        isMuted: true,
      }));

      return {
        ...state,
        channels,
      };
    }
    case ADD_VIDEO: {
      const { channelId } = action.payload;
      const channels = [...state.channels];
      if (channels.every(c => c.channelId !== channelId)) {
        channels.push({ channelId, isMuted: true });
        localStorage.setItem(
          'ytl_switcher_channels',
          JSON.stringify(channels.map(c => c.channelId)),
        );
      }

      return {
        ...state,
        channels,
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
