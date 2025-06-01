import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledNotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #eaeef6;
  text-align: center;
`;

const StyledTitle = styled.h2`
  font-size: 36px;
  color: #dc3545;
  margin-bottom: 20px;
`;

const StyledMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <StyledTitle>404</StyledTitle>
      <StyledMessage>Страница не найдена</StyledMessage>
      <StyledLink to="/">Вернуться на главную</StyledLink>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
