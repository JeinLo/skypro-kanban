import {
  SHeader,
  Logo,
  StyledActions,
  StyledTaskLink,
  StyledUserLink,
  StyledArrow,
} from "./Header.styled";
import { useState, useEffect } from "react";
import PopUser from "../popups/PopUser/PopUser";

function Header({ setIsAuth }) {
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
    <SHeader>
      <Logo>
        <img src="/images/logo.png" alt="SkyPro Logo" />
      </Logo>
      <StyledActions>
        <StyledTaskLink to="/card/add">Создать новую задачу</StyledTaskLink>
        <StyledUserLink onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          {userName} <StyledArrow>▼</StyledArrow>
        </StyledUserLink>
        <PopUser
          isOpen={isPopUserOpen}
          setIsAuth={setIsAuth}
          userName={userName}
        />
      </StyledActions>
    </SHeader>
  );
}

export default Header;