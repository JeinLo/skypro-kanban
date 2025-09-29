import styled, { keyframes } from "styled-components";

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
  background-color: ${props => props.theme.modalBackground || '#ffffff'};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px 13px 19px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
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
  background-color: ${({ $themeType, theme }) =>
    theme.categories[$themeType]?.background || theme.categories._default.background || '#e0e0e0'};
  color: ${({ $themeType, theme }) =>
    theme.categories[$themeType]?.color || theme.categories._default.color || '#000000'};
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
    background-color: ${props => props.theme.secondary || '#94A6BE'};
    transition: background-color 0.3s;
  }
  &:hover div {
    background-color: ${props => props.theme.primaryHover || '#3f53d8'};
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
  color: ${props => props.theme.text || '#000000'};
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
    stroke: ${props => props.theme.secondary || '#94A6BE'};
    stroke-width: 0.8;
  }
  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${props => props.theme.secondary || '#94A6BE'};
    letter-spacing: 0.2px;
  }
`;