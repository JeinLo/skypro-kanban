import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
    transition: background-color 0.3s, color 0.3s;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default GlobalStyle;