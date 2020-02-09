import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.pink};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
    }

    h1 {
      display: flex;
      font-size: 14px;
      font-weight: bold;
      font-family: 'Roboto';
      font-style: normal;
      color: #444444;
      margin: 8px;
    }

    button {
      border: 0;
      border-radius: 4px;
      margin: 5px 0;
      height: 38px;
      color: #fff;
      background: ${colors.pink};
      transition: background 0.2s;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      font-weight: bold;
      font-size: 16px;

      &:hover {
        background: ${darken(0.08, `${colors.pink}`)};
      }
    }

    span {
      color: ${colors.pink};
      align-self: flex-start;
      font-weight: bold;
    }
  }
`;
