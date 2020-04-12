import React, { FC, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import VideoContainer from './VideoContainer';
import { StoreContext } from '../store';

const VideoGrid: FC = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Grid container>
        {state.lives.map((live) => (
          <VideoContainer key={live.videoId} live={live} />
        ))}
      </Grid>
    </>
  );
};

export default VideoGrid;
