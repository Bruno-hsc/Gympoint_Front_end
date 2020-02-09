import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  margin: 45px auto;
  width: 100%;
  max-width: 80%;
  font-family: Roboto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #444444;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      white-space: nowrap;
      background: ${colors.pink};
      color: #fff;
      padding: 10px 25px;
      border-radius: 5px;
      margin-right: 20px;
      height: 40px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

      &:hover {
        background: ${darken(0.1, `${colors.pink}`)};
      }
    }
    label {
      margin-left: 6px;
      cursor: pointer;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 20px;
  color: #444444;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  a {
    margin: 20px;
    color: #4d85ee;
    font-weight: bold;
    transition: color 0.2s;
    font-size: 15px;

    &:hover {
      color: ${darken(0.1, '#4d85ee')};
    }
  }

  button {
    background: none;
    border: 0;
    font-weight: bold;
    color: #de3b3b;
    transition: color 0.2s;
    font-size: 15px;

    &:hover {
      color: ${darken(0.1, '#de3b3b')};
    }
  }
`;

export const InputSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #fff;
  height: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  input {
    border: 0;
    margin-left: 10px;
  }
`;
