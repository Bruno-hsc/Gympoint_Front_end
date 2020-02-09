import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <h1>YOUR E-MAIL</h1>
        <Input name="email" type="email" placeholder="example@email.com" />
        <h1>YOUR PASSWORD</h1>
        <Input name="password" type="password" placeholder="*********" />

        <button type="submit">{loading ? 'Loading...' : 'Log In'}</button>
      </Form>
    </>
  );
}
