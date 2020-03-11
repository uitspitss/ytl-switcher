import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { StoreContext } from '../store';
import { ADD_VIDEO } from '../actions';

const AdditionForm: FC = () => {
  const { dispatch } = useContext(StoreContext);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    if (data && data.channelId && typeof data.channelId === 'string')
      dispatch({
        type: ADD_VIDEO,
        payload: { channelId: data.channelId },
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="channelId" ref={register({ required: true })} />
      <input type="submit" value="追加する" />
    </form>
  );
};

export default AdditionForm;
