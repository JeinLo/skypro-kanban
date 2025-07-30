import { useState } from "react";
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

function PopUser({ isOpen, setIsAuth, userName = "Ivan Ivanov", userEmail = "ivan.ivanov@gmail.com", theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  if (!isOpen) return null;

  return (
    <>
      <StyledPopUser>
        <StyledName>{userName}</StyledName>
        <StyledEmail>{userEmail}</StyledEmail>
        <StyledThemeToggleWrapper>
          <StyledThemeLabel htmlFor="theme-toggle">Темная тема</StyledThemeLabel>
          <StyledToggleSwitch
            id="theme-toggle"
            type="checkbox"
            checked={theme === "dark"}
            onChange={onToggleTheme}
          />
        </StyledThemeToggleWrapper>
        <StyledLogoutButton onClick={handleLogoutClick}>Выйти</StyledLogoutButton>
      </StyledPopUser>

      {confirmOpen && (
        <Overlay role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <ModalWrapper>
            <ModalTitle id="logout-title">Вы уверены, что хотите выйти?</ModalTitle>
            <ModalButtons>
              <ModalButton onClick={handleConfirmLogout}>Да, выйти</ModalButton>
              <ModalCancelButton onClick={handleCancelLogout}>Нет, остаться</ModalCancelButton>
            </ModalButtons>
          </ModalWrapper>
        </Overlay>
      )}
    </>
  );
}

export default PopUser;
