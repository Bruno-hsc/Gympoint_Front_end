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

export default function StudentList() {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPage, setloadingPage] = useState(false);

  async function loadStudents({ page = 1, query = '', name = '' } = {}) {
    const response = await api.get(
      `/students?name=${name}&page=${page}&q=${query}`
    );

    const {
      students: _students,
      page: _page,
      last_page: _lastPage,
    } = response.data;

    setIsFirstPage(Number(page) === 1);
    setIsLastPage(Number(page) === _lastPage);

    setStudents(_students);
    setCurrentPage(_page);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleQueryChange(event) {
    const _name = event.target.value;

    loadStudents({ name: _name });
  }

  function handlePrev() {
    if (!isFirstPage) {
      const page = Number(currentPage) - 1;

      setCurrentPage(page);
      setloadingPage(true);
      loadStudents({ page });
    }
  }

  function handleNext() {
    if (!isLastPage) {
      const page = Number(currentPage) + 1;

      setCurrentPage(page);
      // setloadingPage(true);

      loadStudents({ page });
    }
  }

  async function handleDeleteStudent(student) {
    if (
      // eslint-disable-next-line no-alert
      window.confirm('Are you sure you want to delete the student?')
    ) {
      try {
        const response = await api.delete(`/students/${student.id}`);
        if (response.data) {
          loadStudents({ query: currentQuery });

          toast.success(`${student.name} has been deleted`);
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
        <h1>Student Management</h1>
        <div>
          <Link to="/students/new">
            <FaPlus size={14} color="#fff" />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Register</label>
          </Link>

          <InputSearch>
            <FaSearch size={18} />
            <input
              name="search"
              type="text"
              placeholder="Search student"
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
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
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
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/students/update/${student.id}`}>Edit</Link>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteStudent(student);
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

/*
 const [students, setStudents] = useState([]);
  const [updateStudent, setUpdateStudent] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students?q=${search}`);
      setStudents(response.data);
    }

    loadStudents();
  }, [search]);

  useEffect(() => {
    async function listStudent() {
      const response = await api.get(`students?q=${search}`);

      setStudents(response.data);
      setUpdateStudent(false);
    }
    listStudent();
  }, [search, updateStudent]);

  const handleSearch = data => {
    const { search: _search } = data;

    console.tron.log(data);
    if (_search.length >= 2 || _search.length === 0) {
      setSearch(_search);
    }
  }; */
