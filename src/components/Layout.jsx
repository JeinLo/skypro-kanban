import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const StyledMain = styled.main`
  flex-grow: 1;
`;

const GlobalHeaderStyles = createGlobalStyle`
  h1, h2, h3, h4, h5, h6 {
    width: 222px;
    height: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #94A6BE;
    margin: 0;
  }
`;

function Layout({ setIsAuth }) {
  return (
    <StyledLayout>
      <GlobalHeaderStyles />
      <Header setIsAuth={setIsAuth} />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledLayout>
  );
}

export default Layout;