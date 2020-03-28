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

const StyledTextField = styled(TextField)`
  margin: 0 5px;
`;

type Props = {
  videoId: string;
  channelId: string;
};

type FormData = {
  vid: string;
  cid: string;
};

const DeletionForm: FC<Props> = ({ videoId, channelId }) => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit(({ vid, cid }) => {
    dispatch({
      type: DELETE_VIDEO,
      payload: { videoId: vid, channelId: cid },
    });
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        name="vid"
        inputRef={register}
        defaultValue={videoId}
        label="ライブ配信ID"
        InputProps={{ readOnly: true }}
      />
      <StyledTextField
        name="cid"
        inputRef={register}
        defaultValue={channelId}
        label="チャンネルID"
        InputProps={{ readOnly: true }}
      />
      <Button type="submit" variant="outlined" color="primary">
        削除する
      </Button>
    </StyledForm>
  );
};

export default DeletionForm;
