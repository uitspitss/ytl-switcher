import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import { StoreContext } from '../store';
import { SET_API_KEY } from '../actions';

const StyledForm = styled.form`
  margin: 10px;
`;

const SettingApiKeyForm: FC = () => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit, setValue } = useForm<{ apiKey: string }>();
  const onSubmit = handleSubmit(({ apiKey }) => {
    dispatch({
      type: SET_API_KEY,
      payload: { apiKey },
    });
    setValue('videoId', '');
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <TextField name="apiKey" inputRef={register} label="APIキー" />
      <Button type="submit" variant="contained" color="primary">
        設定する
      </Button>
    </StyledForm>
  );
};

export default SettingApiKeyForm;
