import { useState, useEffect } from "react";
import {
  SHeader,
  Logo,
  StyledActions,
  StyledTaskLink,
  StyledUserLink,
} from "./Header.styled";
import PopUser from "../popups/PopUser/PopUser";
import { Link } from "react-router-dom";

function Header({ setIsAuth, theme, onToggleTheme, token, setTasks }) {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const [userName, setUserName] = useState("Ivan Ivanov");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUserName(parsed.user?.name || parsed.name || "Пользователь");
      } catch (err) {
        console.error("Ошибка парсинга userInfo:", err);
      }
    }
  }, []);

  return (
    <SHeader theme={theme}>
      <Logo theme={theme}>
        <img
          src={`/images/${theme === "dark" ? "logo_dark.png" : "logo.png"}`}
          alt="Logo"
        />
      </Logo>
      <StyledActions>
        <StyledTaskLink as={Link} to="/createcard" theme={theme}>
          Создать новую задачу
        </StyledTaskLink>
        <StyledUserLink theme={theme} onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          {userName}
        </StyledUserLink>
        <PopUser
          isOpen={isPopUserOpen}
          setIsAuth={setIsAuth}
          userName={userName}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </StyledActions>
    </SHeader>
  );
}

export default Header;