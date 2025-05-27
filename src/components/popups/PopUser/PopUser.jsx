import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  StyledPopUser,
  StyledName,
  StyledEmail,
  StyledSelect,
  StyledButton,
  StyledUserLink,
  StyledArrow,
} from "./PopUser.styled";

function PopUser({ setIsAuth }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <>
      <StyledUserLink onClick={() => setIsOpen(!isOpen)}>
        Ivan Ivanov <StyledArrow>▼</StyledArrow>
      </StyledUserLink>
      <StyledPopUser isOpen={isOpen}>
        <StyledName>Ivan Ivanov</StyledName>
        <StyledEmail>ivan@example.com</StyledEmail>
        <StyledSelect>
          <option value="theme1">Тема 1</option>
          <option value="theme2">Тема 2</option>
        </StyledSelect>
        <StyledButton onClick={handleLogout}>Выйти</StyledButton>
      </StyledPopUser>
    </>
  );
}

export default PopUser;
