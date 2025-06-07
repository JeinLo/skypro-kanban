import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import AppRoutes from "./AppRoutes.jsx";

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <AppRoutes />
      </StyledApp>
    </>
  );
}

export default App;
