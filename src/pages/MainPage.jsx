import styled from "styled-components";
import Main from "../components/Main/Main";

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

function MainPage({ loading }) {
  return (
    <StyledMainPage>
      {loading ? <div>Loading...</div> : <Main />}
    </StyledMainPage>
  );
}

export default MainPage;
