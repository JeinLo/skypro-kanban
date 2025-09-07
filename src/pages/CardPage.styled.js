import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $isDarkTheme }) =>
    $isDarkTheme ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ $isDarkTheme }) => ($isDarkTheme ? "#fff" : "#fff")};
  width: 700px;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  font-family: "Roboto", sans-serif;
  color: #000;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0;
  flex-grow: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-grow: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const StatusButton = styled.button`
  height: 30px;
  padding: 10px 14px; /* Адаптивная ширина для редактируемых статусов */
  border-radius: 24px;
  border: 0.7px solid #94A6BE;
  background-color: ${({ $isActive }) => ($isActive ? "#94A6BE" : "#ffffff")};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#94A6BE")};
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
  margin: 0 5px 5px 0;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Специфический стиль для неактивного статуса (до редактирования) */
  &:disabled {
    width: 136px;
    gap: 7px;
    margin-right: auto;
    margin-left: 0;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background-color: #94A6BE;
    color: #ffffff;
    border-color: #94A6BE;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const TextareaLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid #94a6be;
  background-color: ${({ disabled }) => (disabled ? "#f0f3f9" : "#f0f3f9")};
  font-size: 14px;
  resize: none;
  color: #333;
  font-family: "Roboto", sans-serif;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};

  &:focus {
    outline: 2px solid #565eef;
    background-color: #fff;
  }

  &::placeholder {
    color: #94a6be;
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
`;

export const CalendarLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const SelectedDateText = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #94a6be;
  margin-top: 6px;
  text-align: center;
`;

export const Category = styled.div`
  padding: 6px 16px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

  ${({ $isDarkTheme, $category }) => {
    switch ($category) {
      case "Web Design":
        return `background-color: ${$isDarkTheme ? "#4d3d1a" : "#FFE4C2"}; color: ${$isDarkTheme ? "#ffaa66" : "#FF6D00"};`;
      case "Research":
        return `background-color: ${$isDarkTheme ? "#1a4d3d" : "#B4FDD1"}; color: ${$isDarkTheme ? "#66ffaa" : "#06B16E"};`;
      case "Copywriting":
        return `background-color: ${$isDarkTheme ? "#3d1a4d" : "#E9D4FF"}; color: ${$isDarkTheme ? "#aa66ff" : "#9A48F1"};`;
      default:
        return `background-color: ${$isDarkTheme ? "#2a2a2a" : "#f4f5f7"}; color: ${$isDarkTheme ? "#666" : "#999"}; opacity: 0.6;`;
    }
  }}
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormContent = styled.div`
  display: flex;
  gap: 24px;
  flex-grow: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  min-width: 140px;
  transition: background-color 0.3s;

  background-color: ${({ $isDelete, $isCancel, $isSecondary }) => {
    if ($isDelete || $isCancel) return "#f0f3f9";
    if ($isSecondary) return "transparent";
    return "#565eef";
  }};
  color: ${({ $isDelete, $isCancel, $isSecondary }) => {
    if ($isDelete) return "#94a6be";
    if ($isCancel) return "#565EEF";
    if ($isSecondary) return "#565eef";
    return "#fff";
  }};
  border: ${({ $isCancel, $isSecondary }) => {
    if ($isCancel) return "1px solid #565EEF";
    if ($isSecondary) return "1px solid #565eef";
    return "none";
  }};

  &:hover {
    background-color: ${({ $isDelete, $isCancel, $isSecondary }) => {
      if ($isDelete) return "#d9e0ff";
      if ($isCancel) return "#565EEF";
      if ($isSecondary) return "#3f53d8";
      return "#3f53d8";
    }};
    color: ${({ $isCancel, $isSecondary }) => ($isCancel || $isSecondary ? "#fff" : "#fff")};
  }

  ${({ $isClose }) =>
    $isClose &&
    `
    width: 86px;
    height: 30px;
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    transform: translate(-11px, -32px);
  `}
`;