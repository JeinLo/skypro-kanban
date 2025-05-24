import React, { useState } from "react";
import PopUser from "../popups/PopUser/PopUser";
import {
  StyledHeader,
  StyledHeaderBlock,
  StyledHeaderNav,
  StyledLogo,
  StyledPrimaryButton,
  StyledUserButton,
} from "./Header.styled";
import { Container } from "../../styles/Global.styled";

function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsUserPopupOpen(false);
  };

  return (
    <StyledHeader>
      <Container>
        <StyledHeaderBlock>
          <div
            style={{
              width: "84.13323974609375px",
              height: "17.18410873413086px",
            }}
          ></div>
          <StyledLogo href="" target="_self">
            SKYPRO
          </StyledLogo>
          <StyledHeaderNav>
            <StyledPrimaryButton>
              <a href="#popNewCard">Создать новую задачу</a>
            </StyledPrimaryButton>
            <StyledUserButton type="button" onClick={handleUserClick}>
              Ivan Ivanov
            </StyledUserButton>
            <PopUser isOpen={isUserPopupOpen} onClose={handleClosePopup} />
          </StyledHeaderNav>
        </StyledHeaderBlock>
      </Container>
    </StyledHeader>
  );
}

export default Header;
