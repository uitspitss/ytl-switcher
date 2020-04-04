import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const SettingApiKeyForm: FC<Props> = ({ apiKey }) => {
  const { dispatch } = useContext(StoreContext);
  const [isLoading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<{ newApiKey: string }>();
  const onSubmit = handleSubmit(async ({ newApiKey }) => {
    setLoading(true);
    await sleep(1000);
    dispatch({
      type: SET_API_KEY,
      payload: { apiKey: newApiKey },
    });
    setLoading(false);
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        name="newApiKey"
        inputRef={register}
        defaultValue={apiKey}
        label="API KEY"
      />
      <Button type="submit" variant="contained" color="primary">
        {isLoading ? <CircularProgress color="secondary" /> : 'SET API KEY'}
      </Button>
    </StyledForm>
  );
};

export default SettingApiKeyForm;
