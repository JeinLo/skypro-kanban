import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackground};
  width: 630px;
  height: 596px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 40px 30px 48px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border: 0.7px solid ${({ theme }) => theme.modalBorder};
  font-family: 'Roboto', sans-serif;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.secondary};
  font-family: 'Roboto', sans-serif;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
`;

export const FormContent = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  width: 370px;
  height: 49px;
  border-radius: 8px;
  padding: 14px;
  gap: 14px;
  border: 0.7px solid ${({ theme }) => theme.secondary}66;
  background-color: ${({ theme }) => theme.modalBackground};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto', sans-serif;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary}66;
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextareaLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  padding: 14px;
  border: 0.7px solid ${({ theme }) => theme.secondary}66;
  background-color: ${({ theme }) => theme.modalBackground};
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto', sans-serif;
  resize: none;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary}66;
  }
`;

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CalendarLabel = styled.label`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

export const SelectedDateText = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.secondary};
  text-align: center;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Category = styled.button`
  padding: 6px 16px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  border: 0.7px solid ${({ theme }) => theme.secondary}66;
  background-color: ${({ $isActive, $category, theme }) =>
    $isActive
      ? $category === 'Web Design'
        ? theme === 'dark' ? '#4d3d1a' : '#FFE4C2'
        : $category === 'Research'
        ? theme === 'dark' ? '#1a4d3d' : '#B4FDD1'
        : $category === 'Copywriting'
        ? theme === 'dark' ? '#3d1a4d' : '#E9D4FF'
        : theme.primary
      : theme.modalBackground};
  color: ${({ $isActive, $category, theme }) =>
    $isActive
      ? $category === 'Web Design'
        ? theme === 'dark' ? '#ffaa66' : '#FF6D00'
        : $category === 'Research'
        ? theme === 'dark' ? '#66ffaa' : '#06B16E'
        : $category === 'Copywriting'
        ? theme === 'dark' ? '#aa66ff' : '#9A48F1'
        : '#ffffff'
      : theme.text};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ $category, theme }) =>
      $category === 'Web Design'
        ? theme === 'dark' ? '#4d3d1a' : '#FFE4C2'
        : $category === 'Research'
        ? theme === 'dark' ? '#1a4d3d' : '#B4FDD1'
        : $category === 'Copywriting'
        ? theme === 'dark' ? '#3d1a4d' : '#E9D4FF'
        : theme.primaryHover};
    color: ${({ $category, theme }) =>
      $category === 'Web Design'
        ? theme === 'dark' ? '#ffaa66' : '#FF6D00'
        : $category === 'Research'
        ? theme === 'dark' ? '#66ffaa' : '#06B16E'
        : $category === 'Copywriting'
        ? theme === 'dark' ? '#aa66ff' : '#9A48F1'
        : '#ffffff'};
  }
`;

export const Error = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: ${({ theme }) => theme.error};
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;