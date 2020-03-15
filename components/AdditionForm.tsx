import React, { FC, useState, useContext } from 'react';
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

const AdditionForm: FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit } = useForm<{ videoId: string }>();
  const onSubmitAdd = handleSubmit(({ videoId }) => {
    if (videoId && typeof videoId === 'string')
      dispatch({
        type: ADD_VIDEO,
        payload: { videoId },
      });
  });
  const onSubmitDelete = handleSubmit(({ videoId }) => {
    if (videoId && typeof videoId === 'string')
      dispatch({
        type: DELETE_VIDEO,
        payload: { videoId },
      });
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="secondary">
        ライブ配信を追加する
      </Button>
      <StyledModal open={open} onClose={handleClose}>
        <StyledPaper>
          {state.lives.map(live => (
            <StyledForm key={live.videoId} onSubmit={onSubmitDelete}>
              <TextField
                name="videoId"
                inputRef={register({ required: true })}
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
              inputRef={register({ required: true })}
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
