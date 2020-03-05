import React, { useRef } from 'react';
import { Form } from '@unform/web';

import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import Input from '~/components/Input';

import api from '~/services/api';

import {
  Container,
  Header,
  Button,
  Content,
  DivForm01,
  DivForm02,
} from './styles';

export default function StudentEdit(params) {
  // console.log(params);
  const formRef = useRef(null);
  const { id } = params.match.params;

  async function loadStudent() {
    const response = await api.get(`/students/${id}`);
    formRef.current.setData({
      name: response.data.name,
      email: response.data.email,
      age: response.data.age,
      weight: response.data.weight,
      height: response.data.height,
    });
  }

  loadStudent();

  async function updateStudent(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Enter a valid email'),
        age: Yup.string(),
        weight: Yup.string(),
        height: Yup.string(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
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
      const response = await api.put(`/students/update/${id}`, data);

      toast.success('The student has been updated');
    } catch (err) {
      toast.error('E-mail already registered');
    }
  }

  return (
    <Container>
      <Form ref={formRef} onSubmit={updateStudent}>
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
