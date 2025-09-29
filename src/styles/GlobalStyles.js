import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#EAEEF6")};
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000")};
    transition: background-color 0.3s, color 0.3s;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#565EEF")};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => (theme === "dark" ? "#565EEF" : "#3f53d8")};
    }
  }
`;

export default GlobalStyle;