import styled from "styled-components";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

function MainPage({ loading, setIsAuth }) {
  return (
    <StyledMainPage>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header setIsAuth={setIsAuth} />
          <Main />
        </>
      )}
    </StyledMainPage>
  );
}

export default MainPage;
