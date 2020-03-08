export enum ActionType {
  MUTE_ALL = 'MUTE_ALL',
  UNMUTE_ONE = 'UNMUTE_ONE',
}

export type Action = {
  type: ActionType;
  payload: {
    videoId: string;
  };
};
