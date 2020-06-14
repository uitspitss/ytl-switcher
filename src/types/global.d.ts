export {};

declare global {
  interface Live {
    videoId: string;
    isMuted: boolean;
    channelId: string;
    updatedAt: number;
  }

  interface State {
    lives: Live[];
    apiKey: string;
    isLoading: boolean;
  }
}
