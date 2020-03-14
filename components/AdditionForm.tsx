import React, { FC, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import { ADD_VIDEO } from '../actions';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  height: 30vh;
  width: 60vh;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const AdditionForm: FC = () => {
  const { dispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (data && data.channelId && typeof data.channelId === 'string')
      dispatch({
        type: ADD_VIDEO,
        payload: { channelId: data.channelId },
      });
  };
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
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="channelId"
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
