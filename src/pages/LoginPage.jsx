import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn, signUp } from "../services/auth";

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
  border: 1px solid ${(props) => (props.$error ? "red" : "#ccc")};
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

const AuthForm = ({ isSignUp, setIsAuth, setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    const newErrors = { name: false, login: false, password: false };
    let isValid = true;

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = true;
      setError("Заполните имя");
      isValid = false;
    }
    if (!formData.login.trim()) {
      newErrors.login = true;
      setError("Заполните логин");
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = true;
      setError("Заполните пароль");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = isSignUp ? await signUp(formData) : await signIn(formData);
      setIsAuth(true);
      setToken(data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("isAuth", true);
      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка авторизации");
    }
  };

  return (
    <StyledBackground>
      <StyledModal>
        <StyledLogo>SkyPro Kanban</StyledLogo>
        <StyledTitle>{isSignUp ? "Регистрация" : "Вход"}</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInputWrapper>
            {isSignUp && (
              <StyledInput
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                $error={errors.name}
              />
            )}
            <StyledInput
              type="text"
              name="login"
              placeholder="Логин"
              value={formData.login}
              onChange={handleChange}
              $error={errors.login}
            />
            <StyledInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              $error={errors.password}
            />
          </StyledInputWrapper>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
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

function LoginPage({ setIsAuth, setToken }) {
  return (
    <AuthForm isSignUp={false} setIsAuth={setIsAuth} setToken={setToken} />
  );
}

export default LoginPage;
