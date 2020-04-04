import React, { FC, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from '@emotion/styled';
import VideoForm from './VideoForm';

const StyledFab = styled(Fab)`
  position: fixed !important;
  bottom: 25px;
  right: 25px;
  z-index: 100;
`;

type Props = {
  floating?: boolean;
};

const AdditionButton: FC<Props> = ({ floating = false }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {floating ? (
        <StyledFab onClick={handleOpen} color="secondary">
          <SettingsIcon />
        </StyledFab>
      ) : (
        <IconButton onClick={handleOpen} color="secondary">
          <SettingsIcon />
        </IconButton>
      )}
      <VideoForm isOpen={open} handleClose={handleClose} />
    </>
  );
};

export default AdditionButton;
