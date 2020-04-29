import React, { FC, useContext } from 'react';
import BaseForm, { FormData } from './BaseForm';
import { StoreContext } from '../store';
import { DELETE_VIDEO } from '../actions';

type Props = {
  videoId: string;
  channelId: string;
};

const DeletionForm: FC<Props> = ({ videoId, channelId }) => {
  const { dispatch } = useContext(StoreContext);

  const submit = ({ vid }: FormData) => {
    dispatch({
      type: DELETE_VIDEO,
      payload: { videoId: vid },
    });
  };

  const props = { videoId, channelId, btnLabel: 'Delete', submit };

  return <BaseForm {...props} />;
};

export default DeletionForm;
