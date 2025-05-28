import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledExitPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eaeef6;
`;

const StyledModal = styled.div`
  background-color: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  background-color: #dc3545;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 10px;
  &:hover {
    background-color: #c82333;
  }
`;

const StyledCancelButton = styled(StyledButton)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

function ExitPage({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <StyledExitPage>
      <StyledModal>
        <StyledTitle>Вы уверены, что хотите выйти?</StyledTitle>
        <StyledButton onClick={handleLogout}>Да, выйти</StyledButton>
        <StyledCancelButton onClick={handleCancel}>
          Нет, остаться
        </StyledCancelButton>
      </StyledModal>
    </StyledExitPage>
  );
}

export default ExitPage;
