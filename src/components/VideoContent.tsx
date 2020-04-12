import React, { FC, useRef, useState, useContext, useEffect } from 'react';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
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
    color: #ffffff;
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
    color: #ffffff;
    background: #000000;
    border: none;
  }
`;

type Props = {
  videoId: string;
  height: string;
  width: string;
  expanded: boolean;
  expand: () => void;
};

const VideoContent: FC<Props> = ({
  videoId,
  height,
  width,
  expanded,
  expand,
}) => {
  const player: any = useRef(null);
  const { state, dispatch } = useContext(StoreContext);
  const isMuted = state.lives.find((c) => c.videoId === videoId)?.isMuted;
  const [volume, setVolume] = useState<number>(50);

  const handleReady = (event: { target: any }) => {
    const p = event.target;
    player.current = p;
    p.playVideo();
    if (isMuted) p.mute();
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
        {isMuted ? '' : <VolumeUpIcon fontSize="large" />}
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
              <VolumeOffIcon fontSize="large" />
            ) : (
              <VolumeUpIcon fontSize="large" />
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
            <VolumeUpIcon fontSize="large" />
          </Grid>
          <Grid item xs={6}>
            <Slider
              value={volume}
              onChange={(_, value) => setVolume(value as number)}
              orientation="vertical"
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item>
            <VolumeDownIcon fontSize="large" />
          </Grid>
        </Grid>
        <Grid className="mute-button" xs={6}>
          <button type="button" onClick={() => expand()}>
            {expanded ? (
              <ZoomOutIcon fontSize="large" />
            ) : (
              <ZoomInIcon fontSize="large" />
            )}
          </button>
        </Grid>
        <Grid className="mute-button" xs={6} />
      </Grid>
    </StyledDiv>
  );
};

export default VideoContent;
