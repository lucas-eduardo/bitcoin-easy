import styled from 'styled-components';
import { shade, transitions } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: #242424;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  box-shadow: 0px 0px 3px 0px;
  background: #f7f4f4;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 74px;
  background: #f0ae32;
  border-radius: 4px 4px 0 0;

  h1 {
    text-align: center;
    font-size: 2.8rem;
    color: #fff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 4rem;

  input {
    border: 1px solid #dbdbdb;
    color: #615f5f;
    height: 40px;
    padding: 0 1.5rem 0 1.5rem;
    ${transitions('border-color 0.2s ease-in')};

    & + input {
      margin-top: 1rem;
    }

    &::placeholder {
      color: #9c9c9c;
    }

    &:focus {
      border-color: #333333;
    }
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    margin-top: 2rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #ffb509;
    ${transitions('color 0.2s ease-in')};

    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${shade(0.2, '#ffb509')};
    }
  }

  button {
    margin-top: 3rem;
    width: 100%;
    height: 40px;
    align-self: center;
    background: #ffb509;
    font-size: 1.4rem;
    font-weight: 700;
    border: 0;
    color: #fff;
    cursor: pointer;
    ${transitions('background 0.2s ease-in')};

    &:hover {
      background: ${shade(0.2, '#ffb509')};
    }
  }
`;
