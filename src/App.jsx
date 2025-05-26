import styled from "styled-components";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import GlobalStyle from "./styles/GlobalStyles";

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
        <Header />
        <Main />
      </StyledApp>
    </>
  );
}

export default App;
