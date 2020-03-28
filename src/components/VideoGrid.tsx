import React, { FC, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VideoContainer from './VideoContainer';
import { StoreContext } from '../store';

const VideoGrid: FC = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Grid container>
        {state.lives.map((live) => (
          <Grid key={live.videoId} item sm={12} md={6}>
            <Box p={1}>
              <VideoContainer live={live} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VideoGrid;
