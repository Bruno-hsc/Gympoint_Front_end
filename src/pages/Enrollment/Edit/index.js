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

export default function PlanEdit(params) {
  // console.log(params);
  const formRef = useRef(null);
  const { id } = params.match.params;

  async function loadPlan() {
    const response = await api.get(`/plans/${id}`);
    formRef.current.setData({
      title: response.data.title,
      duration: response.data.duration,
      price: response.data.price,
    });
  }

  loadPlan();

  async function updatePlan(data) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        duration: Yup.number(),
        price: Yup.number(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      // eslint-disable-next-line no-unused-vars
      const response = await api.put(`/plans/update/${id}`, data);

      toast.success('The plan has been updated');
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
      <Form ref={formRef} onSubmit={updatePlan}>
        <Header>
          <h1>Edit Plan</h1>
          <div>
            <Link to="/plans">
              <FaArrowLeft size={14} color="#fff" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Plans</label>
            </Link>

            <Button type="submit">
              <FaUserPlus size={14} color="#fff" />
              <span>Save</span>
            </Button>
          </div>
        </Header>

        <Content>
          <DivForm01>
            <strong>Title</strong>
            <Input name="title" type="text" placeholder="Title" />
          </DivForm01>

          <DivForm02>
            <div>
              <strong>Duration</strong>
              <Input name="duration" type="text" placeholder="Duration" />
            </div>

            <div>
              <strong>Price</strong>
              <Input name="price" type="text" placeholder="Price" />
            </div>
          </DivForm02>
        </Content>
      </Form>
    </Container>
  );
}
