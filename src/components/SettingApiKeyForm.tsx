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

const StyledTextField = styled(TextField)`
  margin: 0 5px;
`;

type Props = {
  apiKey: string;
};

const SettingApiKeyForm: FC<Props> = ({ apiKey }) => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit } = useForm<{ newApiKey: string }>();
  const onSubmit = handleSubmit(({ newApiKey }) => {
    dispatch({
      type: SET_API_KEY,
      payload: { apiKey: newApiKey },
    });
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        name="newApiKey"
        inputRef={register}
        defaultValue={apiKey}
        label="APIキー"
      />
      <Button type="submit" variant="contained" color="primary">
        設定する
      </Button>
    </StyledForm>
  );
};

export default SettingApiKeyForm;
