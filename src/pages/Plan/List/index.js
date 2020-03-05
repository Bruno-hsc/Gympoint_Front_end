import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Content,
  InputSearch,
  ButtonHead,
  ButtonHeadPrev,
  ButtonHeadNext,
} from './styles';

import api from '~/services/api';

export default function PlanList() {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPage, setloadingPage] = useState(false);

  async function loadPlans({ page = 1, query = '', title = '' } = {}) {
    const response = await api.get(
      `/plans?title=${title}&page=${page}&q=${query}`
    );

    const { plans: _plans, page: _page, last_page: _lastPage } = response.data;

    setIsFirstPage(Number(page) === 1);
    setIsLastPage(Number(page) === _lastPage);

    setPlans(_plans);
    setCurrentPage(_page);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  function handleQueryChange(event) {
    const _title = event.target.value;

    loadPlans({ title: _title });
  }

  function handlePrev() {
    if (!isFirstPage) {
      const page = Number(currentPage) - 1;

      setCurrentPage(page);
      setloadingPage(true);
      loadPlans({ page });
    }
  }

  function handleNext() {
    if (!isLastPage) {
      const page = Number(currentPage) + 1;

      setCurrentPage(page);
      // setloadingPage(true);

      loadPlans({ page });
    }
  }

  async function handleDeletePlan(plan) {
    if (
      // eslint-disable-next-line no-alert
      window.confirm('Are you sure you want to delete the student?')
    ) {
      try {
        const response = await api.delete(`/plans/${plan.id}`);
        if (response.data) {
          loadPlans({ query: currentQuery });

          toast.success(`${plan.title} has been deleted`);
        }
      } catch (error) {
        toast.error(
          `Student not found ${error.response.data.messages[0].errors[0]}`
        );
      }
    }
  }

  return (
    <Container>
      <Header>
        <h1>Plans Management</h1>
        <div>
          <Link to="/plans/new">
            <FaPlus size={14} color="#fff" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Register</label>
          </Link>

          <InputSearch>
            <FaSearch size={18} />
            <input
              name="search"
              type="text"
              placeholder="Search Plan"
              onChange={handleQueryChange}
            />
          </InputSearch>
        </div>
      </Header>

      <Content>
        <section>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Monthly Price</th>
                <th>
                  <ButtonHead>
                    <ButtonHeadPrev type="button" onClick={handlePrev}>
                      <FaAngleLeft size={14} color="#fff" />
                      <button type="button">Prev</button>
                    </ButtonHeadPrev>
                    <span>Page: {currentPage}</span>
                    <ButtonHeadNext type="button" onClick={handleNext}>
                      <button type="button">Next</button>
                      <FaAngleRight size={14} color="#fff" />
                    </ButtonHeadNext>
                  </ButtonHead>
                </th>
                <th colSpan="2">&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>
                    {plan.duration}
                    <span> {plan.duration > 1 ? 'Months' : 'Month'}</span>
                  </td>
                  <td>{plan.price}</td>
                  <td>
                    <Link to={`/plans/update/${plan.id}`}>Edit</Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeletePlan(plan);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Content>
    </Container>
  );
}
