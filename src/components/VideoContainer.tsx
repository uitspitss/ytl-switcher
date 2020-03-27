import React, { FC, useState, useCallback } from 'react';
import VideoContent from './VideoContent';

type Props = {
  videoId: string;
};

const VideoContainer: FC<Props> = (props: Props) => {
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');

  const measureRef = useCallback(node => {
    if (node !== null) {
      const w = node.getBoundingClientRect().width;
      const h = (w * 9) / 16;
      setWidth(w.toString());
      setHeight(h.toString());
    }
  }, []);

  return (
    <div ref={measureRef}>
      <VideoContent height={height} width={width} {...props} />
    </div>
  );
};

export default VideoContainer;
