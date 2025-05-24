import styled from "styled-components";
import themes from "../../styles/theme";

export const StyledHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${themes.background.white};
`;

export const StyledHeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const StyledHeaderNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  padding-right: 10px;
`;

export const StyledLogo = styled.a`
  width: 84.13323974609375px;
  height: 17.18410873413086px;
  position: absolute;
  top: 27.91px;
  left: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${themes.text.primary};
  text-decoration: none;
`;

export const StyledPrimaryButton = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: ${themes.primary.background};
  color: ${themes.primary.color};
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;

  a {
    color: ${themes.primary.color};
  }

  &:hover {
    background-color: ${themes.hover.primary};
  }

  @media screen and (max-width: 495px) {
    width: 178px;
    margin-right: 10px;
    position: static;
  }
`;

export const StyledUserButton = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: ${themes.text.primary};
  border: none;
  background: transparent;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid ${themes.text.primary};
    border-bottom: 1.9px solid ${themes.text.primary};
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }
`;
