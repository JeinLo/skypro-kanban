import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: background-color 0.3s, color 0.3s;
  }
  * {
    box-sizing: border-box;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: ${props => props.theme.primaryHover};
    }
  }
`;

export default GlobalStyle;