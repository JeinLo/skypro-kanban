import styled from 'styled-components';

export const StyledPopUser = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: ${({ theme }) => theme.modalBackground};
  padding: 20px;
  border-radius: 8px;
  width: 220px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 39px 0px ${({ theme }) => theme.secondary}66;
  transition: box-shadow 0.3s;
`;

export const StyledName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

export const StyledEmail = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};
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
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  cursor: pointer;
`;

export const StyledThemeLabel = styled.span`
  user-select: none;
`;

export const StyledToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 40px;
  height: 20px;
  position: relative;
  appearance: none;
  background: ${({ theme }) => theme.modalBorder};
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background: ${({ theme }) => theme.primary};
  }

  &::before {
    content: '';
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
  border: 1.5px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  background-color: ${({ theme }) => theme.modalBackground};
  color: ${({ theme }) => theme.primary};

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.primary};
    color: #ffffff;
    border-color: ${({ theme }) => theme.primaryHover};
  }
`;