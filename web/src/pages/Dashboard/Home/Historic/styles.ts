import styled from 'styled-components';
import { transitions, shade } from 'polished';

export const Wrapper = styled.div`
  grid-column: 1/3;
`;

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
    ${transitions('background 0.2s ease-in')};

    &.buy {
      background: #28a745;

      &:hover {
        background: ${shade(0.2, '#28a745')};
      }
    }

    &.sell {
      background: #dc3545;

      &:hover {
        background: ${shade(0.2, '#dc3545')};
      }
    }
  }
`;
