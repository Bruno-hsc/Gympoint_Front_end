import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope, useField } from '@unform/core';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import Input from '~/components/Input';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Header,
  Button,
  Content,
  DivForm01,
  DivForm02,
} from './styles';

export default function StudentForm() {
  const formRef = useRef(null);

  async function handleAddStudent(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('You must put a name'),
        email: Yup.string()
          .email('Enter a valid email')
          .required('You must put an email'),
        age: Yup.string().required('You must put the age'),
        weight: Yup.string().required('You must put the weigth'),
        height: Yup.string().required('You must put the height'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }

    try {
      const student = await api.get('/students');

      if (student.email !== data.email) {
        const response = await api.post(`/students`, data);
        toast.success('cadastrado');
        console.log(student);
      }
    } catch (err) {
      toast.error('Ja existe');
    }
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleAddStudent}>
        <Header>
          <h1>Student Management</h1>
          <div>
            <Link to="/students">
              <FaArrowLeft size={14} color="#fff" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Home</label>
            </Link>

            <Button>
              <FaUserPlus size={14} color="#fff" />
              <button type="submit">Save</button>
            </Button>
          </div>
        </Header>

        <Content>
          <DivForm01>
            <strong>Full Name</strong>
            <Input name="name" type="text" placeholder="name" />
            <strong>Email address</strong>
            <Input name="email" type="text" placeholder="Email" />
          </DivForm01>

          <DivForm02>
            <div>
              <strong>Age</strong>
              <Input name="age" type="text" />
            </div>
            <div>
              <strong>Weight</strong>
              <Input name="weight" type="text" />
            </div>
            <div>
              <strong>Height</strong>
              <Input name="height" type="text" />
            </div>
          </DivForm02>
        </Content>
      </Form>
    </Container>
  );
}
