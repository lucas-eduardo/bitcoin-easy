import styled from 'styled-components';
import { shade, transitions } from 'polished';

export const Wrapper = styled.div``;

export const ContentCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 300px 600px 600px;
  grid-gap: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 2rem;
  box-shadow: 1px 3px 4px -0.6px #242424;
  border-radius: 4px;

  header {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #f0ae38;

    h2 {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
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
  }

  main {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

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
  }

  footer {
    border-top: 2px solid #f0ae38;

    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    button {
      margin-top: 1rem;
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
  }
`;
