import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import { ADD_VIDEO, DELETE_VIDEO } from '../actions';

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

const StyledForm = styled.form`
  margin: 10px;
`;

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const AdditionForm: FC<Props> = ({ isOpen, handleClose }) => {
  const { state, dispatch } = useContext(StoreContext);

  const deletionForm = useForm<{ videoId: string }>();
  const additionForm = useForm<{ videoId: string }>();
  const onSubmitDelete = deletionForm.handleSubmit(({ videoId }) => {
    console.log(videoId);
    dispatch({
      type: DELETE_VIDEO,
      payload: { videoId },
    });
  });
  const onSubmitAdd = additionForm.handleSubmit(({ videoId }) => {
    console.log(videoId);
    dispatch({
      type: ADD_VIDEO,
      payload: { videoId },
    });
  });

  return (
    <>
      <StyledModal open={isOpen} onClose={handleClose}>
        <StyledPaper>
          {state.lives.map(live => (
            <StyledForm key={live.videoId} onSubmit={onSubmitDelete}>
              <TextField
                name="videoId"
                inputRef={deletionForm.register({ required: true })}
                defaultValue={live.videoId}
                label="ライブ配信ID"
              />
              <Button type="submit" variant="outlined" color="primary">
                削除する
              </Button>
            </StyledForm>
          ))}
          <StyledForm onSubmit={onSubmitAdd}>
            <TextField
              name="videoId"
              inputRef={additionForm.register({ required: true })}
              label="ライブ配信ID"
            />
            <Button type="submit" variant="contained" color="primary">
              追加する
            </Button>
          </StyledForm>
        </StyledPaper>
      </StyledModal>
    </>
  );
};

export default AdditionForm;
