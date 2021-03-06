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

      const response = await api.post(`/students/new`, data);
      toast.success('The student has been registered');

      reset();
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
        return;
      }
      const { response } = err;
      toast.error(response.data.error);
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

            <Button type="submit">
              <span>
                <FaUserPlus size={14} color="#fff" />
              </span>
              Save
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
