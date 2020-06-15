import styled from 'styled-components';
import { shade, transitions } from 'polished';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;

  height: 100%;
  min-height: 100vh;
  background: #f7f4f4;
`;

export const Menu = styled.nav`
  background: #242424;

  ul {
    list-style: none;

    li {
      height: 50px;
      display: flex;
      align-items: center;

      & + li {
        margin-top: 1rem;
      }

      a {
        text-decoration: none;
        padding: 1rem;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        color: #f0ae32;
        font-weight: 700;
        background: linear-gradient(to right, transparent 50%, #f0ae32 50%);
        background-size: 200% 100%;
        background-position: left;
        ${transitions(['color 0.2s ease-in 0.3s', 'background 0.5s ease-in'])};

        &:hover {
          background-position: right;
          color: #fff;
        }

        &.active {
          background: #f0ae32;
          color: #fff;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            right: 0px;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            border-right: 15px solid #f7f4f4;
          }
        }
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding: 2rem;

  div {
    color: #fff;

    h1 {
      font-size: 2.8rem;
    }

    span {
      display: flex;
      align-items: center;
      font-weight: 500;
      letter-spacing: 0.15px;
      margin-top: 1rem;
      font-size: 1.2rem;

      button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 15px;
        height: 15px;
        cursor: pointer;
        color: #fff;
        background: transparent;
        border: 0;
        margin-right: 0.7rem;
        ${transitions('color 0.2s ease-in')};

        svg {
          width: 15px;
          height: 15px;
        }

        &:hover {
          color: ${shade(0.2, '#fff')};
        }
      }
    }
  }

  > button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: transparent;
    border: 0;
    color: #dc3545;
    ${transitions('color 0.2s ease-in')};

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      color: ${shade(0.2, '#dc3545')};
    }
  }
`;

export const Main = styled.main`
  padding: 2rem;
  height: 100vh;
  overflow-y: auto;
`;
