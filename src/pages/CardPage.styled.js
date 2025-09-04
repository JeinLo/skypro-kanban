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

<<<<<<< HEAD
export const Input = styled.input`
  width: 370px;
  height: 40px;
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid #94a6be;
  background-color: ${({ disabled }) => (disabled ? "#f0f3f9" : "#f0f3f9")};
  font-size: 14px;
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

export const StatusButton = styled.button`
  width: 200px;
=======
export const StatusButton = styled.button`
  width: 200px; /* Увеличена ширина для вмещения текста */
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
  height: 30px;
  padding: 6px 16px;
  border-radius: 24px;
  background-color: ${({ $isActive }) => ($isActive ? "#94A6BE" : "#f0f3f9")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#94A6BE")};
  font-size: 14px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;

  &:hover:not(:disabled) {
    background-color: #565eef;
    color: #fff;
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
  width: 370px;
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
  background-color: #ffe4c2;
  color: #ff6d00;
  flex-shrink: 0;
<<<<<<< HEAD
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
=======
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
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
    if ($isDelete || $isCancel) return "#94a6be";
    if ($isSecondary) return "#565eef";
    return "#fff";
  }};
  border: ${({ $isCancel, $isSecondary }) => {
    if ($isCancel) return "1px solid #94a6be";
    if ($isSecondary) return "1px solid #565eef";
    return "none";
  }};

  &:hover {
    background-color: ${({ $isDelete, $isCancel, $isSecondary }) => {
      if ($isDelete || $isCancel) return "#d9e0ff";
      if ($isSecondary) return "#3f53d8";
      return "#3f53d8";
    }};
    color: ${({ $isCancel, $isSecondary }) => ($isCancel || $isSecondary ? "#fff" : "#fff")};
<<<<<<< HEAD
  }

  ${({ $isClose }) =>
    $isClose &&
    `
=======
  };

  ${({ $isClose }) =>
  $isClose &&
  `
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    width: 86px;
    height: 30px;
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
<<<<<<< HEAD
    right: 10px;
=======
    right: 10px; 
>>>>>>> 2aa1e8a18524cf86bffad9e9e532bbcb850ddf83
    transform: translate(-11px, -32px);
  `}
`;