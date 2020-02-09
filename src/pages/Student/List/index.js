import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { Input, Form } from '@rocketseat/unform';

import { Container, Header, Content, InputSearch } from './styles';
import api from '~/services/api';

export default function StudentList() {
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

  const handleSearch = event => {
    const { value } = event.target;

    console.tron.log(value);
    if (value.length >= 2 || value.length === 0) {
      setSearch(value);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Student Management</h1>
        <div>
          <Link to="/students/new">
            <FaPlus size={14} color="#fff" />
            <label>Register</label>
          </Link>

          <Form>
            <InputSearch onSubmit={handleSearch}>
              <button type="submit" onSubmit={handleSearch}>
                <FaSearch size={18} />
              </button>

              <Input
                name="search"
                placeholder="Search student"
                onChange={handleSearch}
              />
            </InputSearch>
          </Form>
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
                    <button type="button">Delete</button>
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
