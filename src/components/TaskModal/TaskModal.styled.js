import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #fff;
  width: 700px;
  max-width: 90vw;
  border-radius: 12px;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #565eef;
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 24px;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const Textarea = styled.textarea`
  resize: vertical;
  min-height: 60px;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 16px;

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const Button = styled.button`
  background-color: #565eef;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.3s ease;
  margin-top: auto; /* кнопка прижата к низу правой колонки */

  &:hover:not(:disabled) {
    background-color: #3a3fcf;
  }

  &:disabled {
    background-color: #a3a3a3;
    cursor: default;
  }
`;

export const Hint = styled.p`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;
