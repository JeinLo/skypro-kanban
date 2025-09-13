import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => (theme === 'dark' ? '#1A1A1A' : '#EAEEF6')};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

export default GlobalStyle;