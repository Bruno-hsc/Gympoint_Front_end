import React from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Content, Profile, ActiveLink } from './styles';
import Logo from '~/assets/logoHeader.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={Logo} alt="Gympoint" />
          <p>|</p>
          <ActiveLink to="/students" activeStyle={{ color: '#444444' }}>
            Students
          </ActiveLink>
          <ActiveLink to="/plans" activeStyle={{ color: '#444444' }}>
            Plans
          </ActiveLink>
          <ActiveLink to="/enrollments" activeStyle={{ color: '#444444' }}>
            Enrollments
          </ActiveLink>
          <ActiveLink to="/help" activeStyle={{ color: '#444444' }}>
            Help orders
          </ActiveLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Admim</strong>
              <button type="submit" onClick={handleSignOut}>
                Sing out
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
