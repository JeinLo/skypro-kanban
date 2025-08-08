import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUp } from "../services/auth";

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#eaeef6")};
`;

const StyledModal = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
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
  border: 1px solid ${({ theme, $error }) => ($error ? (theme === "dark" ? "#ff6666" : "red") : (theme === "dark" ? "#333" : "#ccc"))};
  border-radius: 4px;
  font-size: 16px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};

  &:focus {
    outline: 2px solid ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#007bff")};
  }

  &::placeholder {
    color: ${({ theme }) => (theme === "dark" ? "#b0b0b0" : "#94a6be")};
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#000000" : "#007bff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#ffffff")};
  padding: 10px;
  border: 2px solid ${({ theme }) => (theme === "dark" ? "#ffffff" : "#007bff")};
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;

  &:hover,
  &:active {
    background-color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#0056b3")};
    border-color: ${({ theme }) => (theme === "dark" ? "#3f53d8" : "#0056b3")};
  }
`;

const StyledFormGroup = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => (theme === "dark" ? "#b0b0b0" : "#000000")};
`;

function RegisterPage({ setIsAuth, setToken, theme }) {
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
    let isValid = true;

    const newErrors = { name: false, login: false, password: false };

    if (!formData.name.trim()) {
      newErrors.name = true;
      setError("Введите имя");
      isValid = false;
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      setError("Введите email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.login)) {
      newErrors.login = true;
      setError("Некорректный email");
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      setError("Введите пароль");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = await signUp({
        name: formData.name,
        login: formData.login,
        password: formData.password,
      });

      setIsAuth(true);
      setToken(data.user?.token || data.token);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err.message);
      setError(err.message);
    }
  };

  return (
    <StyledBackground theme={theme}>
      <StyledModal theme={theme}>
        <StyledTitle theme={theme}>Регистрация</StyledTitle>
        <StyledForm theme={theme} onSubmit={handleSubmit}>
          <StyledInputWrapper>
            <StyledInput
              theme={theme}
              type="text"
              name="name"
              placeholder="Имя"
              value={formData.name}
              onChange={handleChange}
              $error={errors.name}
            />
            <StyledInput
              theme={theme}
              type="email"
              name="login"
              placeholder="Email"
              value={formData.login}
              onChange={handleChange}
              $error={errors.login}
            />
            <StyledInput
              theme={theme}
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              $error={errors.password}
            />
          </StyledInputWrapper>

          {error && (
            <p style={{ color: theme === "dark" ? "#ff6666" : "red", textAlign: "center" }}>{error}</p>
          )}

          <StyledButton theme={theme} type="submit">Зарегистрироваться</StyledButton>

          <StyledFormGroup theme={theme}>
            <p>Уже есть аккаунт?</p>
            <Link to="/login">Войдите здесь</Link>
          </StyledFormGroup>
        </StyledForm>
      </StyledModal>
    </StyledBackground>
  );
}

export default RegisterPage;