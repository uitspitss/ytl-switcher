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

const StyledTextField = styled(TextField)`
  margin: 0 5px;
`;

type FormData = {
  videoId: string;
  channelId: string;
};

const AdditionForm: FC = () => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit(({ videoId, channelId }) => {
    if (videoId || channelId) {
      dispatch({
        type: ADD_VIDEO,
        payload: { videoId, channelId },
      });
      setValue('videoId', '');
      setValue('channelId', '');
    }
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField name="videoId" inputRef={register} label="Live ID" />
      <StyledTextField
        name="channelId"
        inputRef={register}
        label="Channel ID"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </StyledForm>
  );
};

export default AdditionForm;
