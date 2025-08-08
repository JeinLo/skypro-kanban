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
import TaskModal from "../TaskModal/TaskModal";

function Header({ setIsAuth, theme, onToggleTheme }) {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
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

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);

  return (
    <SHeader theme={theme}>
      <Logo theme={theme}>
        <img
          src={`/images/${theme === "dark" ? "logo_dark.png" : "logo.png"}`}
          alt="Logo"
        />
      </Logo>
      <StyledActions>
        <StyledTaskLink theme={theme} onClick={openTaskModal}>
          Создать новую задачу
        </StyledTaskLink>
        <StyledUserLink theme={theme} onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          {userName} <StyledArrow theme={theme}>▼</StyledArrow>
        </StyledUserLink>
        <PopUser
          isOpen={isPopUserOpen}
          setIsAuth={setIsAuth}
          userName={userName}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          onCreateTask={(task) => {
            closeTaskModal();
          }}
          theme={theme}
        />
      </StyledActions>
    </SHeader>
  );
}

export default Header;