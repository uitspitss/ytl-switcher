import React, { useContext } from 'react';
import { NextPage } from 'next';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Logo from '../components/Logo';
import VideoContainer from '../components/VideoContainer';
import { StoreProvider, StoreContext } from '../store';

const IndexPage: NextPage = () => {
  const { state } = useContext(StoreContext);

  return (
    <StoreProvider>
      <Logo />
      <Grid container>
        {state.videos.map(v => (
          <Grid key={v.videoId} item xs={12} sm={6}>
            <Box p={1}>
              <VideoContainer videoId={v.videoId} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </StoreProvider>
  );
};

export default IndexPage;
