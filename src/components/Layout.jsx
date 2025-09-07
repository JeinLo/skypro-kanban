import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  transition: background-color 0.3s, color 0.3s;
`;

const StyledMain = styled.main`
  flex-grow: 1;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  transition: background-color 0.3s, color 0.3s;
`;

const GlobalHeaderStyles = createGlobalStyle`
  h1, h2, h3, h4, h5, h6 {
    width: 222px;
    height: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: ${({ theme }) => (theme === "dark" ? "#b0b0b0" : "#94A6BE")};
    margin: 0;
    transition: color 0.3s;
  }

  /* Подсветка для всех модальных окон */
  [role="dialog"] {
    outline: 2px solid ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
    box-shadow: 0 0 10px ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
    transition: outline 0.3s, box-shadow 0.3s;
  }
`;

function Layout({ setIsAuth, theme, onToggleTheme, token, setTasks }) {
  return (
    <StyledLayout theme={theme}>
      <GlobalHeaderStyles theme={theme} />
      <Header setIsAuth={setIsAuth} theme={theme} onToggleTheme={onToggleTheme} token={token} setTasks={setTasks} />
      <StyledMain theme={theme}>
        <Outlet context={{ setTasks }} /> {/* Передаем setTasks через контекст */}
      </StyledMain>
    </StyledLayout>
  );
}

export default Layout;