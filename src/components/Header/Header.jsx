import {
  SHeader,
  Logo,
  StyledActions,
  StyledTaskLink,
  StyledUserLink,
  StyledArrow,
} from "./Header.styled";
import { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";

function Header({ setIsAuth }) {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);

  return (
    <SHeader>
      <Logo>
        <img src="/images/logo.png" alt="SkyPro Logo" />
      </Logo>
      <StyledActions>
        <StyledTaskLink to="/card/add">Создать новую задачу</StyledTaskLink>
        <StyledUserLink onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          Ivan Ivanov <StyledArrow>▼</StyledArrow>
        </StyledUserLink>
        <PopUser isOpen={isPopUserOpen} setIsAuth={setIsAuth} />
      </StyledActions>
    </SHeader>
  );
}

export default Header;