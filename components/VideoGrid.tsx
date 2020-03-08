import React, { FC, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VideoContainer from './VideoContainer';
import AdditionForm from './AdditionForm';
import { StoreContext } from '../store';

const VideoGrid: FC = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Grid container>
        {state.videos.map(v => (
          <Grid key={v.videoId} item xs={12} sm={6}>
            <Box p={1}>
              <VideoContainer videoId={v.videoId} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <AdditionForm />
    </>
  );
};

export default VideoGrid;
