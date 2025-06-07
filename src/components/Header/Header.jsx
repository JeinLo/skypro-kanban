import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PopUser from "../popups/PopUser/PopUser.jsx";

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledTaskLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledUserLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledArrow = styled.span`
  font-size: 12px;
`;

function Header({ setIsAuth }) {
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const name = userInfo.user?.name || "Ivan Ivanov";

  return (
    <SHeader>
      <Logo>SKYPRO</Logo>
      <StyledActions>
        <StyledTaskLink to="/card/add">Создать задание</StyledTaskLink>
        <StyledUserLink onClick={() => setIsPopUserOpen(!isPopUserOpen)}>
          {name} <StyledArrow>▼</StyledArrow>
        </StyledUserLink>
        <PopUser isOpen={isPopUserOpen} setIsAuth={setIsAuth} />
      </StyledActions>
    </SHeader>
  );
}

export default Header;
