import { useState, useEffect } from "react";
import {
  StyledPopUser,
  StyledName,
  StyledEmail,
  StyledThemeToggleWrapper,
  StyledThemeLabel,
  StyledToggleSwitch,
  StyledLogoutButton,
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
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  const handleLogoutClick = () => {
    navigate("/exit");
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    onToggleTheme(newTheme);
  };

  if (!isOpen) return null;

  return (
    <StyledPopUser $isDarkTheme={isDarkTheme}>
      <StyledName $isDarkTheme={isDarkTheme}>{userName}</StyledName>
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
  );
}

export default PopUser;