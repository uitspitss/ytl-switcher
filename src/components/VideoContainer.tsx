import React, { FC, useState, useCallback, useContext, useEffect } from 'react';
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

  const measureRef = useCallback((node) => {
    if (node !== null) {
      const w = node.getBoundingClientRect().width;
      const h = (w * 9) / 16;
      setWidth(w.toString());
      setHeight(h.toString());
    }
  }, []);

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
    <div ref={measureRef}>
      <VideoContent
        height={height}
        width={width}
        videoId={latestLive.videoId}
      />
    </div>
  );
};

export default VideoContainer;
