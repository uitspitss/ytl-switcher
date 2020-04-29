import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';

const StyledForm = styled.form`
  margin: 10px;
`;

const StyledTextField = styled(TextField)`
  margin: 0 5px;
`;

type Props = {
  videoId: string;
  channelId: string;
  btnLabel: string;
  submit: ({ vid, cid }: FormData) => void;
};

export type FormData = {
  vid: string;
  cid: string;
};

const BaseForm: React.FC<Props> = ({
  videoId,
  channelId,
  btnLabel,
  submit,
}) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const onSubmit = handleSubmit(({ vid, cid }) => {
    if (vid || cid) {
      submit({ vid, cid });
      setValue('vid', '');
      setValue('cid', '');
    }
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        name="vid"
        inputRef={register}
        label="Live ID"
        defaultValue={videoId}
      />
      <StyledTextField
        name="cid"
        inputRef={register}
        label="Channel ID"
        defaultValue={channelId}
      />
      <Button type="submit" variant="contained" color="primary">
        {btnLabel}
      </Button>
    </StyledForm>
  );
};

export default BaseForm;
