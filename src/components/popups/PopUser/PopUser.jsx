import React, { useState } from "react";
import {
  StyledPopUser,
  StyledPopUserContainer,
  StyledPopUserBlock,
  StyledPopUserContent,
  StyledPopUserTitle,
  StyledPopUserEmail,
  StyledPopUserThemeSelect,
  StyledPopUserButton,
  StyledPopUserClose,
} from "./PopUser.styled";

function PopUser({ isOpen, onClose }) {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // Заглушка для смены темы: в реальном проекте здесь будет логика обновления глобальной темы
    console.log(`Selected theme: ${e.target.value}`);
  };

  const handleLogout = () => {
    // Заглушка для выхода из аккаунта
    console.log("User logged out");
    onClose();
  };

  return (
    <StyledPopUser isOpen={isOpen}>
      <StyledPopUserContainer>
        <StyledPopUserBlock>
          <StyledPopUserClose onClick={onClose}>×</StyledPopUserClose>
          <StyledPopUserContent>
            <StyledPopUserTitle>Профиль</StyledPopUserTitle>
            <StyledPopUserTitle>Ivan Ivanov</StyledPopUserTitle>
            <StyledPopUserEmail>ivan.ivanov@example.com</StyledPopUserEmail>
            <StyledPopUserThemeSelect
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Светлая тема</option>
              <option value="dark">Тёмная тема</option>
            </StyledPopUserThemeSelect>
            <StyledPopUserButton onClick={handleLogout}>
              Выйти
            </StyledPopUserButton>
          </StyledPopUserContent>
        </StyledPopUserBlock>
      </StyledPopUserContainer>
    </StyledPopUser>
  );
}

export default PopUser;
