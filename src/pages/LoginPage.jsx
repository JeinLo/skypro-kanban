import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const StyledBackground = styled.div`
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
`;

const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const StyledFormGroup = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  & a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthForm = ({ isSignUp, setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuth(true);
    navigate("/");
  };

  return (
    <StyledBackground>
      <StyledModal>
        <StyledLogo>SkyPro Kanban</StyledLogo>
        <StyledTitle>{isSignUp ? "Регистрация" : "Вход"}</StyledTitle>
        <StyledForm onSubmit={handleLogin}>
          <StyledInputWrapper>
            {isSignUp && (
              <StyledInput type="text" name="name" placeholder="Имя" />
            )}
            <StyledInput type="text" name="login" placeholder="Эл. почта" />
            <StyledInput type="password" name="password" placeholder="Пароль" />
          </StyledInputWrapper>
          <StyledButton type="submit">
            {isSignUp ? "Зарегистрироваться" : "Войти"}
          </StyledButton>
          {!isSignUp && (
            <StyledFormGroup>
              <p>Нужно зарегистрироваться?</p>
              <Link to="/register">Регистрируйтесь здесь</Link>
            </StyledFormGroup>
          )}
          {isSignUp && (
            <StyledFormGroup>
              <p>
                Есть аккаунт? <Link to="/login">Войдите здесь</Link>
              </p>
            </StyledFormGroup>
          )}
        </StyledForm>
      </StyledModal>
    </StyledBackground>
  );
};

function LoginPage({ setIsAuth }) {
  return <AuthForm isSignUp={false} setIsAuth={setIsAuth} />;
}

export default LoginPage;
