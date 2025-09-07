import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledExitPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background-color: #ffffff;
  width: 370px;
  height: 180px;
  border-radius: 10px;
  border: 0.7px solid #ccc;
  padding: 50px 60px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #000;
`;

const StyledButton = styled.button`
  width: 153px;
  height: 30px;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: #565EEF;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  border: none;
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #3f53d8;
  }

  &:active {
    background-color: #3f53d8;
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: #ffffff;
  color: #565EEF;
  border: 0.7px solid #565EEF;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 150%
  letter-spacing: -1%;
  text-align: center;

  &:hover,
  &:active {
    background-color: #565EEF;
    color: #ffffff;
  }
`;

function ExitPage({ setIsAuth, theme }) {
  console.log("ExitPage рендерится, props:", { setIsAuth, theme });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userInfo");
    setIsAuth(false);
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <StyledExitPage onClick={handleCancel}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <StyledTitle>Выйти из аккаунта</StyledTitle>
        <div style={{ display: "flex", gap: "20px" }}>
          <StyledButton onClick={handleLogout}>Да, выйти</StyledButton>
          <StyledCancelButton onClick={handleCancel}>Нет, остаться</StyledCancelButton>
        </div>
      </StyledModal>
    </StyledExitPage>
  );
}

export default ExitPage;