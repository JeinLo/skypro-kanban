import styled from "styled-components";
import themes from "../../../styles/theme";

export const StyledPopUser = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 100%;
  min-width: 375px;
  height: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 0.4);
`;

export const StyledPopUserContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledPopUserBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${themes.background.white};
  max-width: 320px;
  width: 100%;
  padding: 20px 16px;
  border-radius: 10px;
  border: 0.7px solid ${themes.text.secondary};
  position: relative;
`;

export const StyledPopUserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const StyledPopUserTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${themes.text.primary};
  margin-bottom: 16px;
`;

export const StyledPopUserEmail = styled.p`
  font-size: 14px;
  color: ${themes.text.secondary};
  margin-bottom: 20px;
`;

export const StyledPopUserThemeSelect = styled.select`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  background-color: ${themes.background.white};
  font-size: 14px;
  color: ${themes.text.primary};
  margin-bottom: 20px;
  padding: 0 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${themes.primary.background};
  }
`;

export const StyledPopUserButton = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 4px;
  background-color: ${themes.primary.background};
  color: ${themes.primary.color};
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${themes.hover.primary};
  }
`;

export const StyledPopUserClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: ${themes.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${themes.text.primary};
  }
`;
