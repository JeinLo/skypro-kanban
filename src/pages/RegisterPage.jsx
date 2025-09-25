import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { signUp } from '../services/auth';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Container } from '../styles/Global.styled';

const StyledBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.background};
`;

const StyledModal = styled.div`
  background-color: ${props => props.theme.modalBackground};
  width: 400px;
  height: 380px;
  border-radius: 10px;
  border: 0.7px solid ${props => props.theme.modalBorder};
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
  color: ${props => props.theme.text};
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
  border: 0.7px solid
    ${({ $error, theme }) => ($error ? theme.error : theme.modalBorder)};
  padding: 8px 10px;
  font-size: 16px;
  background-color: ${props => props.theme.modalBackground};
  color: ${props => props.theme.text};
  &:focus {
    outline: 2px solid ${props => props.theme.primary};
  }
  &::placeholder {
    color: ${props => props.theme.secondary};
  }
`;

const StyledErrorMessage = styled.p`
  color: ${props => props.theme.error};
  font-size: 12px;
  text-align: center;
  margin: 0;
`;

const StyledButton = styled.button`
  width: 248px;
  height: 30px;
  border-radius: 4px;
  padding: 8px 10px;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.secondary : theme.primary};
  color: #ffffff;
  border: 0.7px solid
    ${({ $disabled, theme }) => ($disabled ? theme.secondary : theme.primary)};
  font-size: 16px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background-color: ${props => props.theme.primaryHover};
    border-color: ${props => props.theme.primaryHover};
  }
`;

const StyledFormGroup = styled.div`
  text-align: center;
  margin-top: 5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.secondary}66;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.secondary}66;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function RegisterPage() {
  const { setIsAuth, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    login: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: false, login: false, password: false };
    let message = '';

    if (!formData.name.trim()) {
      newErrors.name = true;
      isValid = false;
      message = 'Заполните все поля в форме.';
    }

    if (!formData.login.trim()) {
      newErrors.login = true;
      isValid = false;
      message = 'Заполните все поля в форме.';
    } else if (!/\S+@\S+\.\S+/.test(formData.login)) {
      newErrors.login = true;
      isValid = false;
      message = 'Введите корректный email.';
    }

    if (!formData.password.trim()) {
      newErrors.password = true;
      isValid = false;
      message = 'Заполните все поля в форме.';
    }

    setErrors(newErrors);
    setErrorMessage(message);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error(errorMessage);
      return;
    }

    try {
      const data = await signUp({
        name: formData.name,
        login: formData.login,
        password: formData.password,
      });

      setIsAuth(true);
      setToken(data.user?.token || data.token);
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Регистрация прошла успешно!');
      navigate('/');
    } catch (err) {
      setErrorMessage('Ошибка регистрации. Попробуйте снова.');
      setErrors({ name: true, login: true, password: true });
      toast.error(err.message || 'Ошибка регистрации. Попробуйте снова.');
    }
  };

  const isFormInvalid =
    errors.name || errors.login || errors.password || errorMessage;

  return (
    <Container>
      <StyledBackground>
        <StyledModal>
          <StyledTitle>Регистрация</StyledTitle>
          <StyledForm onSubmit={handleSubmit}>
            <StyledInputWrapper>
              <StyledInput
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                $error={errors.name}
              />
              <StyledInput
                type="email"
                name="login"
                placeholder="Эл. почта"
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
              {errorMessage && (
                <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
              )}
            </StyledInputWrapper>
            <StyledButton type="submit" $disabled={isFormInvalid}>
              Зарегистрироваться
            </StyledButton>
            <StyledFormGroup>
              <span>
                Уже есть аккаунт?{' '}
                <StyledLink to="/login">Войдите здесь</StyledLink>
              </span>
            </StyledFormGroup>
          </StyledForm>
        </StyledModal>
      </StyledBackground>
    </Container>
  );
}

export default RegisterPage;