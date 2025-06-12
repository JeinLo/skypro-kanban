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
      <Logo>SkyPro</Logo>
      <StyledActions>
        <StyledTaskLink to="/card/add">Создать задание</StyledTaskLink>
        <StyledUserLink onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          Ivan Ivanov <StyledArrow>▼</StyledArrow>
        </StyledUserLink>
        <PopUser isOpen={isPopUserOpen} setIsAuth={setIsAuth} />
      </StyledActions>
    </SHeader>
  );
}

export default Header;
