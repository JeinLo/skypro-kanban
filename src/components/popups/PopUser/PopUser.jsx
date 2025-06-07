import { useNavigate } from "react-router-dom";
import {
  StyledPopUser,
  StyledName,
  StyledEmail,
  StyledSelect,
  StyledButton,
} from "./PopUser.styled";

function PopUser({ isOpen, setIsAuth }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (typeof setIsAuth !== "function") {
      console.error("setIsAuth is not a function");
      return;
    }
    navigate("/exit");
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const name = userInfo.user?.name || "Ivan Ivanov";
  const email = userInfo.user?.login || "ivan@example.com";

  return (
    <StyledPopUser isOpen={isOpen}>
      <StyledName>{name}</StyledName>
      <StyledEmail>{email}</StyledEmail>
      <StyledSelect>
        <option value="theme1">Тема 1</option>
        <option value="theme2">Тема 2</option>
      </StyledSelect>
      <StyledButton onClick={handleLogoutClick}>Выйти</StyledButton>
    </StyledPopUser>
  );
}

export default PopUser;
