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
      display: flex;
      align-items: center;
      white-space: nowrap;
      background: #979797;
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
        background: ${darken(0.1, '#979797')};
      }
    }
    label {
      margin-left: 6px;
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
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
  border: 0;

  &:hover {
    background: ${darken(0.1, `${colors.pink}`)};
  }

  span {
    margin-left: 4px;
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 25px;
  color: #444444;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

/* export const Input = styled.div`
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
`; */

export const DivForm01 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /*input {
    padding: 12px;
    border-radius: 5px;
    border: 2px solid #ddd;
    background: #fff;
    margin: 10px 0;
  }*/
`;

export const DivForm02 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /*input {
    padding: 12px;
    border-radius: 5px;
    border: 2px solid #ddd;
    background: #fff;
    width: 100%;
    margin-top: 10px;
  }*/

  /*div {
    display: flex;
    flex-direction: column;
    width: 30%;
  }*/
`;
