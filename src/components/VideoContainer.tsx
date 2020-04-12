import React, { FC, useState, useCallback, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VideoContent from './VideoContent';
import useLatestLive from '../hooks/useLatestLive';
import { StoreContext } from '../store';
import { SET_VIDEO } from '../actions';

type Props = {
  live: Live;
};

const VideoContainer: FC<Props> = ({ live }) => {
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const { state, dispatch } = useContext(StoreContext);
  const [expanded, setExpanded] = useState<boolean>(false);

  const setWindowSize = (w: string, h: string) => {
    setWidth(w);
    setHeight(h);
  };

  const measureRef = useCallback((node) => {
    if (node !== null) {
      const w = node.getBoundingClientRect().width;
      const h = (w * 9) / 16;
      setWindowSize(w.toString(), h.toString());
    }
  }, []);

  const handleExpand = () => {
    if (expanded) {
      setExpanded(false);
      const w = Number(width) * 0.5;
      const h = (w * 9) / 16;
      setWindowSize(w.toString(), h.toString());
    } else {
      setExpanded(true);
      const w = Number(width) * 2;
      const h = (w * 9) / 16;
      setWindowSize(w.toString(), h.toString());
    }
  };

  const { latestLive } = useLatestLive(state.apiKey, live);

  useEffect(() => {
    dispatch({
      type: SET_VIDEO,
      payload: {
        videoId: latestLive.videoId,
        channelId: latestLive.channelId,
      },
    });
  }, [latestLive, dispatch]);

  return (
    <Grid item sm={12} md={expanded ? 12 : 6}>
      <Box p={1}>
        <div ref={measureRef}>
          <VideoContent
            height={height}
            width={width}
            videoId={latestLive.videoId}
            expanded={expanded}
            expand={handleExpand}
          />
        </div>
      </Box>
    </Grid>
  );
};

export default VideoContainer;
