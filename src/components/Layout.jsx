import styled from "styled-components";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

function Layout({ setIsAuth }) {
  return (
    <StyledLayout>
      <Header setIsAuth={setIsAuth} />
      <Outlet />
    </StyledLayout>
  );
}

export default Layout;
