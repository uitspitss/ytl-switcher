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
        {state.channels.map(c => (
          <Grid key={c.channelId} item xs={12} sm={6}>
            <Box p={1}>
              <VideoContainer channelId={c.channelId} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VideoGrid;
