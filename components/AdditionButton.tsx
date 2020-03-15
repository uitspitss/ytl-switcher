import React, { FC, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
          <AddIcon />
        </StyledFab>
      ) : (
        <Button onClick={handleOpen} color="secondary" variant="contained">
          ライブ配信を追加する
        </Button>
      )}
      <VideoForm isOpen={open} handleClose={handleClose} />
    </>
  );
};

export default AdditionButton;
