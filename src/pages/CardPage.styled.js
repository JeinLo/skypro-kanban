import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) =>
    theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.modalBackground};
  width: 700px;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.text};
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
  color: ${({ theme }) => theme.text};
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
  color: ${({ theme }) => theme.text};
`;

export const StatusButton = styled.button`
  height: 30px;
  padding: 10px 14px;
  border-radius: 24px;
  border: 0.7px solid ${({ theme }) => theme.secondary};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.secondary : theme.modalBackground};
  color: ${({ $isActive, theme }) => ($isActive ? '#ffffff' : theme.secondary)};
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s;
  white-space: nowrap;
  margin: 0 5px 5px 0;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    width: 136px;
    gap: 7px;
    margin-right: auto;
    margin-left: 0;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background-color: ${({ theme }) => theme.secondary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.secondary};
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
  color: ${({ theme }) => theme.text};
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.secondary};
  background-color: ${({ disabled, theme }) =>
    disabled ? '#f0f3f9' : theme.modalBackground};
  font-size: 14px;
  resize: none;
  color: ${({ theme }) => theme.text};
  font-family: 'Roboto', sans-serif;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondary};
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
  color: ${({ theme }) => theme.text};
`;

export const SelectedDateText = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.secondary};
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
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${({ theme, $category }) => {
    switch ($category) {
      case 'Web Design':
        return `background-color: ${theme === 'dark' ? '#4d3d1a' : '#FFE4C2'}; color: ${theme === 'dark' ? '#ffaa66' : '#FF6D00'};`;
      case 'Research':
        return `background-color: ${theme === 'dark' ? '#1a4d3d' : '#B4FDD1'}; color: ${theme === 'dark' ? '#66ffaa' : '#06B16E'};`;
      case 'Copywriting':
        return `background-color: ${theme === 'dark' ? '#3d1a4d' : '#E9D4FF'}; color: ${theme === 'dark' ? '#aa66ff' : '#9A48F1'};`;
      default:
        return `background-color: ${theme === 'dark' ? '#2a2a2a' : '#f4f5f7'}; color: ${theme === 'dark' ? '#666' : '#999'}; opacity: 0.6;`;
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

  background-color: ${({ $isDelete, $isCancel, $isSecondary, theme }) => {
    if ($isDelete || $isCancel) return '#f0f3f9';
    if ($isSecondary) return 'transparent';
    return theme.primary;
  }};
  color: ${({ $isDelete, $isCancel, $isSecondary, theme }) => {
    if ($isDelete) return theme.secondary;
    if ($isCancel) return theme.primary;
    if ($isSecondary) return theme.primary;
    return '#fff';
  }};
  border: ${({ $isCancel, $isSecondary, theme }) => {
    if ($isCancel) return `1px solid ${theme.primary}`;
    if ($isSecondary) return `1px solid ${theme.primary}`;
    return 'none';
  }};

  &:hover {
    background-color: ${({ $isDelete, $isCancel, $isSecondary, theme }) => {
      if ($isDelete) return '#d9e0ff';
      if ($isCancel) return theme.primary;
      if ($isSecondary) return theme.primaryHover;
      return theme.primaryHover;
    }};
    color: ${({ $isCancel, $isSecondary }) =>
      $isCancel || $isSecondary ? '#fff' : '#fff'};
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