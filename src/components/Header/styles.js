import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    a {
      font-weight: bold;
      color: ${props => (props.active ? '#444444' : '#999999')};
      margin-left: 15px;
    }

    p {
      color: #dddddd;
      font-size: 30px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #444444;
    }
    button {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #de3b3b;
      border: 0;
      background: #fff;
    }
  }
`;

export const ActiveLink = styled(NavLink).attrs({})``;
