import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../styles/Global.styled';

const StyledNotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const StyledTitle = styled.h2`
  font-size: 36px;
  color: ${({ theme }) => theme.error};
  margin-bottom: 20px;
  font-weight: 700;
`;

const StyledMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    color: #ffffff;
  }
`;

const NotFoundPage = ({ theme }) => {
  return (
    <Container>
      <StyledNotFoundPage theme={theme}>
        <StyledTitle>404</StyledTitle>
        <StyledMessage>Страница не найдена</StyledMessage>
        <StyledLink to="/">Вернуться на главную</StyledLink>
      </StyledNotFoundPage>
    </Container>
  );
};

export default NotFoundPage;