export {};

declare global {
  interface Live {
    videoId: string;
    isMuted: boolean;
    updatedAt: number;
    channelId: string;
  }

  interface State {
    lives: Live[];
    apiKey: string;
  }
}
