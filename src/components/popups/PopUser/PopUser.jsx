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
    if (typeof setIsAuth === "function") {
      setIsAuth(false);
      localStorage.setItem("isAuth", false);
      navigate("/login");
    } else {
      console.error("setIsAuth is not a function");
    }
  };

  return (
    <StyledPopUser isOpen={isOpen}>
      <StyledName>Ivan Ivanov</StyledName>
      <StyledEmail>ivan@example.com</StyledEmail>
      <StyledSelect>
        <option value="theme1">Тема 1</option>
        <option value="theme2">Тема 2</option>
      </StyledSelect>
      <StyledButton onClick={handleLogoutClick}>Выйти</StyledButton>
    </StyledPopUser>
  );
}

export default PopUser;
