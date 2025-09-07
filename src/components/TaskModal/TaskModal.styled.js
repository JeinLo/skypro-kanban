import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#1a1a1a" : "#ffffff")};
  width: 630px;
  height: 596px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 40px 30px 48px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border: 0.7px solid ${({ $isDarkTheme }) => ($isDarkTheme ? "#333" : "#ccc")};
  font-family: "Roboto", sans-serif;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: 600; /* SemiBold */
  font-style: normal;
  font-size: 20px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#b0b0b0" : "#94a6be")};
  font-family: "Roboto", sans-serif;

  &:hover {
    color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 600; /* SemiBold */
  font-style: normal;
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#333")};
`;

export const Input = styled.input`
  width: 370px;
  height: 49px;
  border-radius: 8px;
  padding: 14px;
  gap: 14px;
  border: 0.7px solid #94A6BE66; /* Обводка полей */
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#2a2a2a" : "#ffffff")};
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")}; /* Текст чёрный */
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: 2px solid ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }

  &::placeholder {
    color: #94A6BE66; /* Плейсхолдер серый */
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextareaLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 600; /* SemiBold */
  font-style: normal;
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#333")};
  margin-top: 20px;
`;

export const Textarea = styled.textarea`
  width: 370px;
  height: 200px;
  border-radius: 8px;
  padding: 14px;
  gap: 14px;
  border: 0.7px solid #94A6BE66; /* Обводка полей */
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#2a2a2a" : "#ffffff")};
  font-size: 14px;
  resize: none;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#000000")}; /* Текст чёрный */
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: 2px solid ${({ $isDarkTheme }) => ($isDarkTheme ? "#3f53d8" : "#565eef")};
  }

  &::placeholder {
    color: #94A6BE66; /* Плейсхолдер серый */
  }
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

export const CalendarLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 600; /* SemiBold */
  font-style: normal;
  font-size: 14px;
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ffffff" : "#333")};
  margin-bottom: 15px; /* Отступ 15px вниз после текста "Даты" */
`;

export const SelectedDateText = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400; /* Regular */
  font-style: normal;
  font-size: 10px;
  text-align: center;
  vertical-align: middle;
  color: #94A6BE;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Category = styled.button`
  width: 115px;
  height: 30px;
  padding: 8px 20px;
  border: none;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  font-family: "Roboto", sans-serif;

  ${({ $isSelected, $isDarkTheme, children }) => {
    if ($isSelected) {
      switch (children) {
        case "Web Design":
          return `background-color: ${$isDarkTheme ? "#4d3d1a" : "#FFE4C2"}; color: ${$isDarkTheme ? "#ffaa66" : "#FF6D00"};`;
        case "Research":
          return `background-color: ${$isDarkTheme ? "#1a4d3d" : "#B4FDD1"}; color: ${$isDarkTheme ? "#66ffaa" : "#06B16E"};`;
        case "Copywriting":
          return `background-color: ${$isDarkTheme ? "#3d1a4d" : "#E9D4FF"}; color: ${$isDarkTheme ? "#aa66ff" : "#9A48F1"};`;
        default:
          return `background-color: ${$isDarkTheme ? "#2a2a2a" : "#f4f5f7"}; color: ${$isDarkTheme ? "#666" : "#999"};`;
      }
    } else {
      switch (children) {
        case "Web Design":
          return `background-color: ${$isDarkTheme ? "#4d3d1a80" : "#FFE4C280"}; color: ${$isDarkTheme ? "#ffaa6680" : "#FF6D0080"}; opacity: 1;`;
        case "Research":
          return `background-color: ${$isDarkTheme ? "#1a4d3d80" : "#B4FDD180"}; color: ${$isDarkTheme ? "#66ffaa80" : "#06B16E80"}; opacity: 1;`;
        case "Copywriting":
          return `background-color: ${$isDarkTheme ? "#3d1a4d80" : "#E9D4FF80"}; color: ${$isDarkTheme ? "#aa66ff80" : "#9A48F180"}; opacity: 1;`;
        default:
          return `background-color: ${$isDarkTheme ? "#2a2a2a80" : "#f4f5f780"}; color: ${$isDarkTheme ? "#66680" : "#99980"}; opacity: 0.4;`;
      }
    }
  }}

  &:hover,
  &:active {
    ${({ $isDarkTheme, children }) => {
      switch (children) {
        case "Web Design":
          return `background-color: ${$isDarkTheme ? "#4d3d1a" : "#FFE4C2"}; color: ${$isDarkTheme ? "#ffaa66" : "#FF6D00"};`;
        case "Research":
          return `background-color: ${$isDarkTheme ? "#1a4d3d" : "#B4FDD1"}; color: ${$isDarkTheme ? "#66ffaa" : "#06B16E"};`;
        case "Copywriting":
          return `background-color: ${$isDarkTheme ? "#3d1a4d" : "#E9D4FF"}; color: ${$isDarkTheme ? "#aa66ff" : "#9A48F1"};`;
        default:
          return `background-color: ${$isDarkTheme ? "#2a2a2a" : "#f4f5f7"}; color: ${$isDarkTheme ? "#666" : "#999"};`;
      }
    }}
  }
`;

export const Button = styled.button`
  width: 132px;
  height: 30px;
  padding: 10px 14px;
  border: 2px solid #565EEF;
  border-radius: 4px;
  background-color: #565EEF;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;
  transition: background-color 0.3s;

  &:hover,
  &:active {
    background-color: #3f53d8;
    border-color: #3f53d8;
  }

  &:focus {
    outline: none;
  }
`;

export const Error = styled.p`
  color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#ff6666" : "red")};
  text-align: center;
  font-size: 14px;
  font-family: "Roboto", sans-serif";
`;