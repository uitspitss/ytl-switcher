export enum ActionType {
  MUTE_ALL = 'MUTE_ALL',
  UNMUTE_ONE = 'UNMUTE_ONE',
  ADD_VIDEO = 'ADD_VIDEO',
}

export type Action = {
  type: ActionType;
  payload: {
    videoId: string;
  };
};
