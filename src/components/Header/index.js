import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserAlt } from 'react-icons/fa';

import { Container, Content, Profile, ActiveLink, Icon } from './styles';
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
          <Link to="/">
            <img src={Logo} alt="Gympoint" />
          </Link>
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
              <Icon>
                <FaUserAlt size={12} color="#444444" />
                <strong>Admim</strong>
              </Icon>
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
