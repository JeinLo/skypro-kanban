import styled from "styled-components";

export const StyledPopUser = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#1a1a1a" : "#ffffff")};
  padding: 20px;
  border-radius: 8px;
  width: 220px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 39px 0px #94A6BE66; /* Рассеянный box-shadow */
  transition: box-shadow 0.3s;

  /* Удаляем outline, так как он не нужен с новым box-shadow */
`;

export const StyledName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")};
  text-align: center;
`;

export const StyledEmail = styled.div`
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94a6be")};
  margin-bottom: 16px;
  word-break: break-word;
  text-align: center;
`;

export const StyledThemeToggleWrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")};
  margin-bottom: 20px;
  cursor: pointer;
`;

export const StyledThemeLabel = styled.span`
  user-select: none;
`;

export const StyledToggleSwitch = styled.input.attrs({ type: "checkbox" })`
  width: 40px;
  height: 20px;
  position: relative;
  appearance: none;
  background: ${({ $isDarkTheme }) => ($isDarkTheme ? "#333" : "#c6c6c6")};
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    transition: transform 0.3s;
    transform: translateX(0);
  }

  &:checked::before {
    transform: translateX(20px);
  }
`;

export const StyledLogoutButton = styled.button`
  width: 100%;
  padding: 8px 0;
  font-weight: 600;
  font-size: 14px;
  border: 1.5px solid #565EEF;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#000000" : "#ffffff")};
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#565eef")};

  &:hover,
  &:active {
    background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
    color: #ffffff;
    border-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }
`;