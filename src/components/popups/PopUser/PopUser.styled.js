import styled from "styled-components";

export const StyledPopUser = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#1a1a1a" : "#ffffff")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  outline: ${({ $isDarkTheme }) => ($isDarkTheme ? "2px solid #ffffff" : "none")};
  box-shadow: ${({ $isDarkTheme }) => ($isDarkTheme ? "0 0 10px #ffffff" : "0 4px 8px rgba(0, 0, 0, 0.1)")};
  transition: outline 0.3s, box-shadow 0.3s;
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

/* Модальное окно - стили */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)")};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#1a1a1a" : "#ffffff")};
  padding: 32px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем содержимое вертикально */
  align-items: center; /* Центрируем содержимое горизонтально */
  height: 200px; /* Фиксированная высота для центрирования */
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 20px 0;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")};
  text-align: center;
  transition: color 0.3s;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px; /* Отступ от текста */
`;

export const ModalButton = styled.button`
  width: 153px;
  height: 30px;
  padding: 8px 10px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: 1.5px solid #565EEF;
  background-color: #565EEF;
  color: #ffffff;
  display: flex;
  justify-content: center; /* Центрируем текст внутри кнопки */
  align-items: center; /* Центрируем текст внутри кнопки */
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:active {
    background-color: #3f53d8;
    border-color: #3f53d8;
  }
`;

export const ModalCancelButton = styled.button`
  width: 153px;
  height: 30px;
  padding: 8px 10px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: 1.5px solid #565EEF;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#000000" : "#ffffff")};
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#565eef")};
  display: flex;
  justify-content: center; /* Центрируем текст внутри кнопки */
  align-items: center; /* Центрируем текст внутри кнопки */
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:active {
    background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
    color: #ffffff;
    border-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }
`;