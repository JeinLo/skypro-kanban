import { Link } from "react-router-dom";
import {
  StyledHeader,
  StyledHeaderBlock,
  StyledHeaderNav,
  StyledLogo,
  StyledPrimaryButton,
  StyledUserButton,
} from "./Header.styled";
import PopUser from "../popups/PopUser";

function Header({ setIsAuth }) {
  return (
    <StyledHeader>
      <StyledHeaderBlock>
        <StyledLogo as={Link} to="/">
          SKYPRO
        </StyledLogo>
        <StyledHeaderNav>
          <StyledPrimaryButton as={Link} to="/card/add">
            Создать новую задачу
          </StyledPrimaryButton>
          <PopUser setIsAuth={setIsAuth} />
        </StyledHeaderNav>
      </StyledHeaderBlock>
    </StyledHeader>
  );
}

export default Header;
