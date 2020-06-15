import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body, input, select, textarea {
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }
`;
