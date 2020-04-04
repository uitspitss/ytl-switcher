import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import { StoreContext } from '../store';
import { MUTE_ALL, UNMUTE_ONE } from '../actions';

type StyledProps = {
  isMuted?: boolean;
};

const StyledDiv = styled.div<StyledProps>`
  position: relative;
  height: 100%;
  width: 100%;

  @keyframes fadeOut {
    0% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.01;
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
    opacity: 0.01;
    cursor: pointer;
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
    color: ${(props) => (props.isMuted ? '#fff' : '#c4302b')};
    background: #000000;
    border: none;
  }
`;

type Props = {
  videoId: string;
  height: string;
  width: string;
};

const VideoContent: FC<Props> = ({ videoId, height, width }) => {
  const player: any = useRef(null);
  const { state, dispatch } = useContext(StoreContext);
  const isMuted = state.lives.find((c) => c.videoId === videoId)?.isMuted;
  const [volume, setVolume] = useState<number>(50);

  const handleReady = (event: { target: any }) => {
    player.current = event.target;
    player.current.playVideo();
    if (isMuted) event.target.mute();
  };

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    p.playVideo();
    if (p.isMuted()) {
      p.unMute();
    } else {
      p.mute();
    }
  }, [videoId, isMuted]);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    p.setVolume(volume);
  }, [volume]);

  return (
    <StyledDiv isMuted={isMuted}>
      <YouTube
        videoId={videoId}
        opts={{
          height,
          width,
          playerVars: {
            autoplay: 1,
          },
        }}
        onReady={handleReady}
        css={css`
          pointer-events: none;
        `}
      />
      <div className="indicator">
        {isMuted ? '' : <VolumeUp fontSize="large" />}
      </div>
      <Grid container className="overlay">
        <Grid className="mute-button" xs={6}>
          <button
            type="button"
            onClick={() =>
              isMuted
                ? dispatch({
                    type: UNMUTE_ONE,
                    payload: { videoId },
                  })
                : dispatch({ type: MUTE_ALL, payload: { videoId } })
            }
          >
            {isMuted ? (
              <VolumeOff fontSize="large" />
            ) : (
              <VolumeUp fontSize="large" />
            )}
          </button>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className="slider-grid"
          xs={6}
        >
          <Grid item>
            <VolumeUp fontSize="large" />
          </Grid>
          <Grid item xs={6}>
            <Slider
              value={volume}
              onChange={(_, value) => setVolume(value as number)}
              orientation="vertical"
            />
          </Grid>
          <Grid item>
            <VolumeDown fontSize="large" />
          </Grid>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default VideoContent;
