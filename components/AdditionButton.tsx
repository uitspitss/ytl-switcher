import React, { FC, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import styled from '@emotion/styled';
import AdditionForm from './AdditionForm';

const StyledFab = styled(Fab)`
  position: absolute !important;
  bottom: 10px;
  right: 10px;
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
      <AdditionForm isOpen={open} handleClose={handleClose} />
    </>
  );
};

export default AdditionButton;
