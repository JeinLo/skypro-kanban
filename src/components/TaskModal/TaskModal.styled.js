import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(234, 238, 246, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #000000;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  color: #94a6be;

  &:hover {
    color: #565eef;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  min-height: 60px;

  &:focus {
    outline: 2px solid #565eef;
  }
`;

export const Button = styled.button`
  background-color: #28a745;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

export const Category = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$isActive ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.$isActive ? "#ffffff" : "#000000")};
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#0056b3" : "#e0e0e0")};
  }
`;

export const Error = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;

export const CalendarWrapper = styled.div`
  margin: 10px 0;
`;