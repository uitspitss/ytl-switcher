import React, { FC, useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import DeletionForm from './DeletionForm';
import AdditionForm from './AdditionForm';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 25px;
`;

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const VideoForm: FC<Props> = ({ isOpen, handleClose }) => {
  const { state } = useContext(StoreContext);

  return (
    <StyledModal open={isOpen} onClose={handleClose}>
      <StyledPaper>
        {state.lives.map((live) => (
          <DeletionForm key={live.videoId} videoId={live.videoId} />
        ))}
        <AdditionForm />
      </StyledPaper>
    </StyledModal>
  );
};

export default VideoForm;
