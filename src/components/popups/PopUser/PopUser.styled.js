import styled from "styled-components";

export const StyledPopUser = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

export const StyledName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #000000;
`;

export const StyledEmail = styled.div`
  font-size: 14px;
  color: #94a6be;
  margin-bottom: 16px;
  word-break: break-word;
`;

export const StyledThemeToggleWrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
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
  background: #c6c6c6;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:checked {
    background: #565eef;
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
  color: #565eef;
  background-color: #ffffff;
  border: 1.5px solid #565eef;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:active {
    background-color: #565eef;
    color: #ffffff;
    border-color: #565eef;
  }
`;

/* Модальное окно - стили, похожие на ExitPage.jsx, но с кнопками по стилю проекта */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(234, 238, 246, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  background-color: #ffffff;
  padding: 32px 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 24px;
  color: #000000;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ModalButton = styled.button`
  padding: 10px 24px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid #565eef;
  background-color: #565eef;
  color: #ffffff;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:active {
    background-color: #3f53d8;
    border-color: #3f53d8;
  }
`;

export const ModalCancelButton = styled.button`
  padding: 10px 24px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid #565eef;
  background-color: #ffffff;
  color: #565eef;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &:active {
    background-color: #565eef;
    color: #ffffff;
    border-color: #565eef;
  }
`;
