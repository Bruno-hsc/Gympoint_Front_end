import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { addMonths, startOfDay, format } from 'date-fns';
import { FaArrowLeft, FaUserPlus, FaSpinner } from 'react-icons/fa';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import Input from '~/components/Input';

import api from '~/services/api';

import DatePicker from '~/components/DatePicker';
import AssyncSelect from '~/components/AssyncSelect';
import ReactSelect from '~/components/ReactSelect';

import {
  Container,
  Header,
  Button,
  Content,
  DivForm01,
  DivForm02,
} from './styles';

export default function EnrollmentForm() {
  const formRef = useRef(null);

  async function handleAddEnrollment(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        student_id: Yup.number().required('The student is mandatory'),
        plan_id: Yup.number().required('The plan is mandatory'),
        start_date: Yup.date()
          .required('You must put a date')
          .min(startOfDay(new Date()), 'the date has to be from today'),
      });
      reset();
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await api.post(`/enrollments/new`, data);

      toast.success('The enrollment has been registered');
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

    console.tron.log('handleInternalSave', data);
  }

  const enrollments = {
    student_id: 0,
    plan_id: 0,
    start_date: new Date(),
  };
  const [endDate, setEndDate] = useState(format(new Date(), 'dd/MM/yyyy'));
  const [saving, setSaving] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`/plans?limit=100`);
      const currencyFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const { plans: _plans } = response.data;

      setPlans(
        _plans
          ? _plans.map(p => ({
              ...p,
              originalTitle: p.title,
              title: `${p.title} (${currencyFormat.format(p.price)})`,
            }))
          : []
      );
    }

    loadPlans();
  }, []);

  useEffect(() => {
    if (!plan || !startDate) return;
    const _price = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(plan.price * plan.duration);
    setTotalPrice(_price);
    setEndDate(format(addMonths(startDate, plan.duration), 'dd/MM/yyyy'));
  }, [plan, startDate]);

  function handleDatePickerChange(date) {
    setStartDate(startOfDay(date));
  }

  function handleSelectChange(_plan) {
    setPlan(_plan);
  }

  function getPromisse(inputValue) {
    return new Promise((resolve, reject) => {
      api
        .get(`/students?page=1&limit=100&q=${inputValue}`)
        .then(result => {
          const { students } = result.data;
          if (students.length > 0) {
            resolve(
              students.map(s => ({
                value: s.id,
                label: s.name,
              }))
            );
          } else {
            resolve([
              {
                value: 0,
                label: 'Digite as primeiras letras do nome do aluno',
              },
            ]);
          }
        })
        .catch(error => reject(error));
    });
  }

  return (
    <Container>
      <Form
        ref={formRef}
        initialData={enrollments}
        onSubmit={handleAddEnrollment}
        context={{ endDate, totalPrice }}
      >
        <Header>
          <h1>Record Enrollments</h1>
          <div>
            <Link to="/enrollments">
              <FaArrowLeft size={14} color="#fff" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Enrollments</label>
            </Link>

            <Button type="submit">
              <span>
                <FaUserPlus color="#fff" size={14} />
              </span>
              Save
            </Button>
          </div>
        </Header>

        <Content>
          <DivForm01>
            <label>Student</label>
            <AssyncSelect
              name="student_id"
              promiseOptions={getPromisse}
              disabled={saving}
            />
          </DivForm01>

          <DivForm02>
            <div>
              <label>Plan</label>
              <ReactSelect
                name="plan_id"
                options={plans}
                onChange={handleSelectChange}
                disabled={saving}
              />
            </div>

            <div>
              <label>Start date</label>
              <DatePicker
                name="start_date"
                onChange={handleDatePickerChange}
                disabled={saving ? 1 : 0}
              />
            </div>
            <div>
              <label>End date</label>
              <input value={endDate} type="text" disabled className="change" />
            </div>
            <div>
              <label>Price</label>
              <input
                className="change"
                name="price"
                type="text"
                value={totalPrice}
                disabled
              />
            </div>
          </DivForm02>
        </Content>
      </Form>
    </Container>
  );
}

/*
<Button type="submit" disabled={saving} saving={saving ? 1 : 0}>
              {saving ? (
                <FaSpinner color="#FFF" size={16} />
              ) : (
                <span>
                  <FaUserPlus color="#fff" size={16} />
                </span>
              )}
              Save
            </Button>
            */
