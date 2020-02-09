import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentList from '~/pages/Student/List';
import StudentForm from '~/pages/Student/Form';
import PlanList from '~/pages/Plan/List';
import PlanForm from '../pages/Plan/Form';
import EnrollmentList from '~/pages/Enrollment/List';
import EnrollmentForm from '~/pages/Enrollment/Form';
import HelpOrderList from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={StudentList} isPrivate />
      <Route path="/students/new" component={StudentForm} isPrivate />
      <Route path="/students/:id/edit" component={StudentForm} isPrivate />

      <Route path="/plans" exact component={PlanList} isPrivate />
      <Route path="/plans/new" component={PlanForm} isPrivate />
      <Route path="/plans/:id/edit" component={PlanForm} isPrivate />

      <Route path="/enrollments" exact component={EnrollmentList} isPrivate />
      <Route path="/enrollments/new" component={EnrollmentForm} isPrivate />
      <Route
        path="/enrollments/:id/edit"
        component={EnrollmentForm}
        isPrivate
      />

      <Route path="/help" component={HelpOrderList} isPrivate />
    </Switch>
  );
}
