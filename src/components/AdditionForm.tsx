import React, { FC, useContext } from 'react';
import BaseForm, { FormData } from './BaseForm';
import { StoreContext } from '../store';
import { ADD_VIDEO } from '../actions';

const AdditionForm: FC = () => {
  const { dispatch } = useContext(StoreContext);

  const submit = ({ vid, cid }: FormData) => {
    dispatch({
      type: ADD_VIDEO,
      payload: { videoId: vid, channelId: cid },
    });
  };

  const props = { videoId: '', channelId: '', btnLabel: 'Add', submit };

  return <BaseForm {...props} />;
};

export default AdditionForm;
