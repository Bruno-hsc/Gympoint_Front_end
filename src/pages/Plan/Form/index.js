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

export default function PlanForm() {
  const formRef = useRef(null);

  async function handleAddPlan(data, { reset }) {
    const plan = await api.get('/plans');
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required('You must put a title'),
        duration: Yup.number().required('You must put a duration'),
        price: Yup.number().required('You must put a price'),
      });
      reset();
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await api.post(`/plans/new`, data);

      toast.success('The plan has been registered');
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
      <Form ref={formRef} onSubmit={handleAddPlan}>
        <Header>
          <h1>Record Plans</h1>
          <div>
            <Link to="/plans">
              <FaArrowLeft size={14} color="#fff" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Plans</label>
            </Link>

            <Button>
              <span>
                <FaUserPlus size={14} color="#fff" />
              </span>
              Save
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
