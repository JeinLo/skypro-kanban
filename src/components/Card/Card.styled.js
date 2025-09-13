import styled, { css, keyframes } from 'styled-components';

export const cardAnimation = keyframes`
  0% { height: 0; opacity: 0; }
  100% { height: auto; opacity: 1; }
`;

export const CardItem = styled.div`
  padding: 5px;
  animation: ${cardAnimation} 500ms linear;
`;

export const CardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => theme.modalBackground};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 13px 19px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s,
    transform 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  ${({ isDragging, theme }) =>
    isDragging &&
    css`
      transform: scale(1.02);
      box-shadow: 0px 10px 39px 0px ${({ theme }) => theme.secondary}66;
    `}
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  background-color: ${({ $category, theme }) => {
    switch ($category) {
      case 'Web Design':
        return theme === 'dark' ? '#4d3d1a' : '#FFE4C2';
      case 'Research':
        return theme === 'dark' ? '#1a4d3d' : '#B4FDD1';
      case 'Copywriting':
        return theme === 'dark' ? '#3d1a4d' : '#E9D4FF';
      default:
        return theme === 'dark' ? '#2a2a2a' : '#f4f5f7';
    }
  }};
  color: ${({ $category, theme }) => {
    switch ($category) {
      case 'Web Design':
        return theme === 'dark' ? '#ffaa66' : '#FF6D00';
      case 'Research':
        return theme === 'dark' ? '#66ffaa' : '#06B16E';
      case 'Copywriting':
        return theme === 'dark' ? '#aa66ff' : '#9A48F1';
      default:
        return theme === 'dark' ? '#666' : '#999';
    }
  }};
  display: flex;
  align-items: center;

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    margin: 0;
  }
`;

export const CardButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  cursor: pointer;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondary};
    transition: background-color 0.3s;
  }

  &:hover div {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: ${({ theme }) => theme.secondary};
    stroke-width: 0.8;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${({ theme }) => theme.secondary};
    letter-spacing: 0.2px;
  }
`;