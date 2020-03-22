import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { utcToZonedTime, format } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

import { toast } from 'react-toastify';
import {
  Container,
  Header,
  Content,
  ButtonHead,
  ButtonHeadPrev,
  ButtonHeadNext,
} from './styles';

import api from '~/services/api';

export default function EnrollmentList() {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [enrollments, setEnrollments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPage, setloadingPage] = useState(false);

  async function loadEnrollments({ page = 1, query = '' } = {}) {
    const response = await api.get(`/enrollments?&page=${page}&q=${query}`);

    const currencyFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const {
      enrollments: _enrollments,
      page: _page,
      last_page: _lastPage,
    } = response.data;

    setIsFirstPage(Number(page) === 1);
    setIsLastPage(Number(page) === _lastPage);

    setEnrollments(
      _enrollments.map(e => ({
        ...e,
        startDateFormated: format(
          utcToZonedTime(e.start_date, 'America/Recife'),
          "dd 'de' MMMM 'de' yyyy",
          { timeZone: 'Brazil/Recife', locale: pt }
        ),
        endDateFormated: format(
          utcToZonedTime(e.end_date, 'America/Recife'),
          "dd 'de' MMMM 'de' yyyy",
          { timeZone: 'Brazil/Recife', locale: pt }
        ),
        formatedPrice: currencyFormat.format(e.price),
      }))
    );
    setCurrentPage(_page);
  }

  useEffect(() => {
    loadEnrollments();
  }, []);

  function handlePrev() {
    if (!isFirstPage) {
      const page = Number(currentPage) - 1;

      setCurrentPage(page);
      setloadingPage(true);
      loadEnrollments({ page });
    }
  }

  function handleNext() {
    if (!isLastPage) {
      const page = Number(currentPage) + 1;

      setCurrentPage(page);
      // setloadingPage(true);

      loadEnrollments({ page });
    }
  }

  async function handleDeleteEnrollment(enrollment) {
    if (
      // eslint-disable-next-line no-alert
      window.confirm('Are you sure you want to delete the enrollment?')
    ) {
      try {
        const response = await api.delete(`/enrollments/${enrollment.id}`);
        if (response.data) {
          loadEnrollments({ query: currentQuery });

          toast.success(
            `The enrollment number: ${enrollment.id} has been deleted`
          );
        }
      } catch (error) {
        toast.error(
          `Enrollment not found ${error.response.data.messages[0].errors[0]}`
        );
      }
    }
  }

  return (
    <Container>
      <Header>
        <h1>Enrollment Management</h1>
        <div>
          <Link to="/enrollments/new">
            <FaPlus size={14} color="#fff" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Register</label>
          </Link>
        </div>
      </Header>

      <Content>
        <section>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Plan</th>
                <th>Start</th>
                <th>End</th>
                <th>Active</th>
                <th>Amount paid</th>
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
              {enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.plan.title}</td>
                  <td>{enrollment.startDateFormated}</td>
                  <td>{enrollment.endDateFormated}</td>
                  <td>
                    {enrollment.active === true ? (
                      <MdCheckCircle size={17} color="green" />
                    ) : (
                      <MdCheckCircle size={17} color="#c0c0c0" />
                    )}
                  </td>
                  <td>{enrollment.formatedPrice}</td>
                  <td>
                    <Link to={`/enrollments/update/${enrollment.id}`}>
                      View/Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteEnrollment(enrollment);
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
