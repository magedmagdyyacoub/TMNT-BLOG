// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
    font-family: 'Orbitron', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;
