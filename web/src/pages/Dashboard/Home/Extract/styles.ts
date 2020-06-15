import styled from 'styled-components';
import { transitions, shade } from 'polished';

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h2 {
    display: flex;
    align-items: center;
    font-weight: 700;
    color: #242424c9;

    svg {
      color: #f0ae38;
      margin-right: 0.5rem;
    }
  }

  button {
    display: flex;
    align-items: center;

    background: transparent;
    margin-left: auto;
    font-size: 1rem;
    font-weight: 700;
    border: 0;
    color: #242424c9;
    cursor: pointer;
    ${transitions('color 0.2s ease-in')};

    svg {
      width: 10px;
      height: 10px;
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${shade(0.2, '#242424c9')};
    }
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;

  table {
    width: 100%;
    color: #212529;
    border-collapse: collapse;
    border: 1px solid #dee2e6;

    tr {
      th {
        vertical-align: bottom;
        padding: 0.75rem;
        border-top: 1px solid #dee2e6;
        text-align: inherit;
        border: 1px solid #dee2e6;
      }

      td {
        padding: 0.75rem;
        vertical-align: top;
        border: 1px solid #dee2e6;
      }
    }
  }

  span {
    display: flex;
    align-items: center;

    &.buy {
      color: #dc3545;
    }

    &.sell {
      color: #28a745;
    }

    & + span {
      margin-top: 1rem;
    }

    strong {
      margin-right: 0.5rem;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  button {
    height: 30px;
    padding: 0.5rem;
    color: #fff;
    border: 0;
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
    background: #f0ae32;
    ${transitions('background 0.2s ease-in')};

    &:hover {
      background: ${shade(0.2, '#f0ae32')};
    }
  }
`;

export const Deposit = styled.form`
  width: 100%;
  max-width: 360px;

  input {
    border: 1px solid #dbdbdb;
    color: #615f5f;
    text-align: center;
    height: 40px;
    padding: 0 1.5rem 0 1.5rem;
    ${transitions('border-color 0.2s ease-in')};

    &::placeholder {
      color: #9c9c9c;
    }

    &:focus {
      border-color: #333333;
    }
  }

  button {
    height: 40px;
    background: #f0ae32;
    border: 0;
    color: #fff;
    padding: 1rem;
    cursor: pointer;
    ${transitions('background 0.2s ease-in')};

    &:hover {
      background: ${shade(0.2, '#f0ae32')};
    }
  }
`;
