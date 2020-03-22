import styled from 'styled-components';

export const Container = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  margin: 10px 0px;

  span {
    font-size: 1.2rem;
    font-stretch: italic;
    text-transform: none;

    *:focus {
      outline: none;
    }
  }
`;
