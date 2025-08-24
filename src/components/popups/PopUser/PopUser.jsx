import { useState, useEffect } from "react";
import {
  StyledPopUser,
  StyledName,
  StyledEmail,
  StyledThemeToggleWrapper,
  StyledThemeLabel,
  StyledToggleSwitch,
  StyledLogoutButton,
  Overlay,
  ModalWrapper,
  ModalTitle,
  ModalButtons,
  ModalButton,
  ModalCancelButton,
} from "./PopUser.styled";
import { useNavigate } from "react-router-dom";

function PopUser({
  isOpen,
  setIsAuth,
  userName = "Пользователь",
  userEmail = "email@example.com",
  theme,
  onToggleTheme = () => {},
}) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  const handleLogoutClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    setConfirmOpen(false);
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setConfirmOpen(false);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    onToggleTheme(newTheme);
  };

  if (!isOpen) return null;

  return (
    <>
      <StyledPopUser $isDarkTheme={isDarkTheme}>
        <StyledName $isDarkTheme={isDarkTheme}>
          {userName}
        </StyledName>
        <StyledEmail $isDarkTheme={isDarkTheme}>{userEmail}</StyledEmail>
        <StyledThemeToggleWrapper $isDarkTheme={isDarkTheme}>
          <StyledThemeLabel htmlFor="theme-toggle">Темная тема</StyledThemeLabel>
          <StyledToggleSwitch
            id="theme-toggle"
            type="checkbox"
            checked={isDarkTheme}
            onChange={handleThemeToggle}
            $isDarkTheme={isDarkTheme}
          />
        </StyledThemeToggleWrapper>
        <StyledLogoutButton $isDarkTheme={isDarkTheme} onClick={handleLogoutClick}>
          Выйти
        </StyledLogoutButton>
      </StyledPopUser>

      {confirmOpen && (
        <Overlay $isDarkTheme={isDarkTheme} role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <ModalWrapper $isDarkTheme={isDarkTheme}>
            <ModalTitle $isDarkTheme={isDarkTheme} id="logout-title">
              Выйти из аккаунта?
            </ModalTitle>
            <ModalButtons>
              <ModalButton $isDarkTheme={isDarkTheme} onClick={handleConfirmLogout}>
                Да, выйти
              </ModalButton>
              <ModalCancelButton $isDarkTheme={isDarkTheme} onClick={handleCancelLogout}>
                Нет, остаться
              </ModalCancelButton>
            </ModalButtons>
          </ModalWrapper>
        </Overlay>
      )}
    </>
  );
}

export default PopUser;