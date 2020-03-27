declare global {
  interface Live {
    videoId: string;
    isMuted: boolean;
  }

  interface State {
    lives: Live[];
  }
}
