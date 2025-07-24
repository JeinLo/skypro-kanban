import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../services/auth";

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
  text-align: center;
`;

const StyledLogo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
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
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginPage({ setIsAuth, setToken }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { login, password } = formData;

    if (!login || !password) {
      setError("Введите email и пароль");
      return;
    }

    try {
      const data = await signIn({ login, password });
      setIsAuth(true);
      setToken(data.user?.token || data.token);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error("Ошибка входа:", err.message);
      setError(err.message);
    }
  };

  return (
    <StyledBackground>
      <StyledModal>
        <StyledLogo>SkyPro Kanban</StyledLogo>
        <StyledTitle>Вход</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInputWrapper>
            <StyledInput
              type="email"
              name="login"
              placeholder="Email"
              value={formData.login}
              onChange={handleChange}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
            />
          </StyledInputWrapper>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <StyledButton type="submit">Войти</StyledButton>

          <StyledFormGroup>
            <p>Нужно зарегистрироваться?</p>
            <Link to="/register">Регистрация</Link>
          </StyledFormGroup>
        </StyledForm>
      </StyledModal>
    </StyledBackground>
  );
}

export default LoginPage;