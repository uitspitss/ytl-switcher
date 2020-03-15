import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import { DELETE_VIDEO } from '../actions';

const StyledForm = styled.form`
  margin: 10px;
`;

type Props = {
  videoId: string;
};

const DeletionForm: FC<Props> = ({ videoId }) => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit } = useForm<{ vid: string }>();
  const onSubmit = handleSubmit(({ vid }) => {
    dispatch({
      type: DELETE_VIDEO,
      payload: { videoId: vid },
    });
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <TextField
        name="vid"
        inputRef={register({ required: true })}
        defaultValue={videoId}
        label="ライブ配信ID"
      />
      <Button type="submit" variant="outlined" color="primary">
        削除する
      </Button>
    </StyledForm>
  );
};

export default DeletionForm;
