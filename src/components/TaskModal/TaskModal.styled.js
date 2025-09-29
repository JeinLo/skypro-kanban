import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.background}80; // Используем theme.background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${props => props.theme.modalBackground};
  width: 630px;
  height: 596px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 40px 30px 48px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border: 0.7px solid ${props => props.theme.secondary}66;
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
  font-weight: 600;
  font-style: normal;
  font-size: 20px;
  color: ${props => props.theme.text};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.theme.secondary};
  font-family: "Roboto", sans-serif;

  &:hover {
    color: ${props => props.theme.primaryHover};
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
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  color: ${props => props.theme.text};
`;

export const Input = styled.input`
  width: 370px;
  height: 49px;
  border-radius: 8px;
  padding: 14px;
  gap: 14px;
  border: 0.7px solid ${props => props.theme.secondary}66;
  background-color: ${props => props.theme.modalBackground};
  font-size: 14px;
  color: ${props => props.theme.text};
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: 2px solid ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.secondary}66;
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TextareaLabel = styled.label`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  color: ${props => props.theme.text};
  margin-top: 20px;
`;

export const Textarea = styled.textarea`
  width: 370px;
  height: 200px;
  border-radius: 8px;
  padding: 14px;
  gap: 14px;
  border: 0.7px solid ${props => props.theme.secondary}66;
  background-color: ${props => props.theme.modalBackground};
  font-size: 14px;
  resize: none;
  color: ${props => props.theme.text};
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: 2px solid ${props => props.theme.primary};
  }

  &::placeholder {
    color: ${props => props.theme.secondary}66;
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
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  color: ${props => props.theme.text};
  margin-bottom: 15px;
`;

export const SelectedDateText = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  text-align: center;
  vertical-align: middle;
  color: ${props => props.theme.secondary};
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

  ${({ $isSelected, theme, children }) => {
    const cat = children;
    if ($isSelected) {
      return `
        background-color: ${theme.categories[cat]?.background || theme.categories.default.background};
        color: ${theme.categories[cat]?.color || theme.categories.default.color};
      `;
    } else {
      return `
        background-color: ${theme.categories[cat]?.background}80 || ${theme.categories.default.background}80;
        color: ${theme.categories[cat]?.color}80 || ${theme.categories.default.color}80;
        opacity: 0.5;
      `;
    }
  }}

  &:hover,
  &:active {
    background-color: ${({ theme, children }) => {
      const cat = children;
      return theme.categories[cat]?.background || theme.categories.default.background;
    }};
    color: ${({ theme, children }) => {
      const cat = children;
      return theme.categories[cat]?.color || theme.categories.default.color;
    }};
  }
`;

export const Button = styled.button`
  width: 132px;
  height: 30px;
  padding: 10px 14px;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 4px;
  background-color: ${props => props.theme.primary};
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
    background-color: ${props => props.theme.primaryHover};
    border-color: ${props => props.theme.primaryHover};
  }

  &:focus {
    outline: none;
  }
`;

export const Error = styled.p`
  color: ${props => props.theme.error || '#ff6666'};
  text-align: center;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;