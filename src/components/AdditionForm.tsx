import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import { ADD_VIDEO } from '../actions';

const StyledForm = styled.form`
  margin: 10px;
`;

const AdditionForm: FC = () => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit, setValue } = useForm<{ videoId: string }>();
  const onSubmit = handleSubmit(({ videoId }) => {
    dispatch({
      type: ADD_VIDEO,
      payload: { videoId },
    });
    setValue('videoId', '');
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <TextField
        name="videoId"
        inputRef={register({ required: true })}
        label="ライブ配信ID"
      />
      <Button type="submit" variant="contained" color="primary">
        追加する
      </Button>
    </StyledForm>
  );
};

export default AdditionForm;
