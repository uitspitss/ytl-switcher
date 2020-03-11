import React, { FC, useRef, useContext, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { StoreContext } from '../store';
import { MUTE_ALL, UNMUTE_ONE } from '../actions';
import useYTL from '../hooks/useYTL';

type StyledProps = {
  height: string;
  width: string;
  isMuted?: boolean;
};

const StyledDiv = styled.div<StyledProps>`
  position: relative;
  height: 100%;
  width: 100%;

  @keyframes fadeOut {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  .indicator {
    position: absolute;
    top: 5px;
    left: 5px;
    color: #c4302b;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    z-index: 50;
    color: #fff;
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  .overlay:hover {
    opacity: 0.8;
  }

  .overlay:not(:hover) {
    animation: fadeOut 1s ease-in;
  }

  .overlay button {
    width: 100%;
    height: 100%;
    color: ${props => (props.isMuted ? '#fff' : '#c4302b')};
    background: #333;
  }
`;

type Props = {
  channelId: string;
  height: string;
  width: string;
};

const VideoContent: FC<Props> = ({ channelId, height, width }) => {
  const player: any = useRef(null);
  const { state, dispatch } = useContext(StoreContext);
  const { latestLive } = useYTL(channelId);
  const isMuted = state.channels.find(c => c.channelId === channelId)?.isMuted;

  const handleReady = (event: { target: any }) => {
    player.current = event.target;
    if (latestLive && isMuted) event.target.mute();
  };

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unMute();
    } else {
      p.mute();
    }
  }, [channelId, isMuted]);

  return (
    <StyledDiv height={height} width={width} isMuted={isMuted}>
      <YouTube
        videoId={latestLive?.videoId}
        opts={{
          height,
          width,
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={handleReady}
      />
      <div className="indicator">
        {isMuted ? '' : <VolumeUpIcon fontSize="large" />}
      </div>
      <div className="overlay">
        <button
          type="button"
          onClick={() =>
            isMuted
              ? dispatch({
                  type: UNMUTE_ONE,
                  payload: { channelId },
                })
              : dispatch({ type: MUTE_ALL, payload: { channelId } })
          }
        >
          {isMuted ? (
            <VolumeOffIcon fontSize="large" />
          ) : (
            <VolumeUpIcon fontSize="large" />
          )}
        </button>
      </div>
    </StyledDiv>
  );
};

export default VideoContent;
