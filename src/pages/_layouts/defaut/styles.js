import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #eee;
  overflow: auto;

  table {
    color: #444;
    width: 100%;
    border-collapse: collapse;

    thead {
      padding-bottom: 10px;
      background: #fff;
      tr {
        text-align: left;
      }

      th {
        padding-bottom: 10px;
        text-transform: uppercase;
      }
    }

    tbody {
      background: #fff;
      tr {
        padding-left: 5px;

        & + tr {
          border-top: 1px solid #eee;
        }
      }

      td {
        padding: 14px 0;
      }
    }
  }
`;
