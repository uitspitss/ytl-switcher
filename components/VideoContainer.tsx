import React, { FC, useState, useCallback } from 'react';
import VideoContent from './VideoContent';

type Props = {
  videoId: string;
};

const VideoContainer: FC<Props> = (props: Props) => {
  const [width, setWidth] = useState('0');

  const measureRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width.toString());
    }
  }, []);

  return (
    <div ref={measureRef}>
      <VideoContent height="390" width={width} {...props} />
    </div>
  );
};

export default VideoContainer;
