import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#eaeef6")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
  text-align: center;
`;

const StyledTitle = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => (theme === "dark" ? "#ff6666" : "#dc3545")};
  margin-bottom: 20px;
`;

const StyledMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === "dark" ? "#b0b0b0" : "#000000")};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage = ({ theme }) => {
  return (
    <StyledNotFoundPage theme={theme}>
      <StyledTitle theme={theme}>404</StyledTitle>
      <StyledMessage theme={theme}>Страница не найдена</StyledMessage>
      <StyledLink theme={theme} to="/">Вернуться на главную</StyledLink>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;