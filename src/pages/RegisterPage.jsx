import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { signUp } from "../services/auth";
import { AuthContext } from "../contexts/AuthContext";

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#eaeef6")};
`;

const StyledModal = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#2a2a2a" : "#ffffff")};
  width: 400px;
  height: 380px;
  border-radius: 10px;
  gap: 10px;
  top: 285px;
  left: 536px;
  border: 0.7px solid ${({ theme }) => (theme === "dark" ? "#333" : "#ccc")};
  padding: 50px 60px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  align-items: center;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 248px;
  height: 30px;
  border-radius: 8px;
  gap: 10px;
  border: 0.7px solid ${({ theme, $error }) => ($error ? "#F84D4D" : (theme === "dark" ? "#333" : "#ccc"))};
  padding: 8px 10px;
  font-size: 16px;
  background-color: ${({ theme }) => (theme === "dark" ? "#1a1a1a" : "#ffffff")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};

  &:focus {
    outline: 2px solid ${({ theme }) => (theme === "dark" ? "#565EEF" : "#565EEF")};
  }

  &::placeholder {
    color: #94A6BE;
  }
`;

const StyledErrorMessage = styled.p`
  color: #F84D4D;
  font-size: 12px;
  text-align: center;
  margin: 0;
`;

const StyledButton = styled.button`
  width: 248px;
  height: 30px;
  border-radius: 4px;
  gap: 10px;
  padding: 8px 10px;
  background-color: ${({ $disabled, theme }) => ($disabled ? "#94A6BE" : "#565EEF")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#ffffff")};
  border: 0.7px solid ${({ $disabled, theme }) => ($disabled ? "#94A6BE" : "#565EEF")};
  font-size: 16px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: #3f53d8;
    border-color: #3f53d8;
  }
`;

const StyledFormGroup = styled.div`
  text-align: center;
  margin-top: 5px;
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: ${({ theme }) => (theme === "dark" ? "#94A6BE66" : "#94A6BE66")};
`;

const StyledLink = styled(Link)`
  color: #94A6BE66;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function RegisterPage({ theme }) {
  const { setIsAuth, setToken } = useContext(AuthContext);
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

  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: false, login: false, password: false };
    let message = "";

    if (!formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
      message = "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.";
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      isValid = false;
      message = "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.";
    } else if (!/\S+@\S+\.\S+/.test(formData.login)) {
      newErrors.login = true;
      isValid = false;
      message = "Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.";
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      isValid = false;
      message = "Введенные вами данные не корректны. Чтобы завершить регистрацию, заполните все поля в форме.";
    }

    setErrors(newErrors);
    setErrorMessage(message);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setErrorMessage("");
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
      setErrorMessage("Введенные вами данные не корректны. Чтобы завершить регистрацию, введите данные корректно и повторите попытку.");
      setErrors({ name: true, login: true, password: true });
    }
  };

  const isFormInvalid = errors.name || errors.login || errors.password || errorMessage;

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
              placeholder="Эл. почта"
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
            {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
          </StyledInputWrapper>

          <StyledButton theme={theme} type="submit" $disabled={isFormInvalid}>
            Зарегистрироваться
          </StyledButton>

          <StyledFormGroup theme={theme}>
            <span>Уже есть аккаунт? <StyledLink to="/login">Войдите здесь</StyledLink></span>
          </StyledFormGroup>
        </StyledForm>
      </StyledModal>
    </StyledBackground>
  );
}

export default RegisterPage;