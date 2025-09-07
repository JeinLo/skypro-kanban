import styled, { css, keyframes } from "styled-components";

export const cardAnimation = keyframes`
  @keyframes cardAnimation {
    0% { height: 0; opacity: 0; }
    100% { height: auto; opacity: 1; }
  }
`;

export const CardItem = styled.div`
  padding: 5px;
  animation: ${cardAnimation} 500ms linear;
`;

export const CardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#ffffff")};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Вернули выравнивание влево */
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
  background-color: ${({ themeType }) => {
    switch (themeType) {
      case "_orange":
        return "#FFE4C2";
      case "_green":
        return "#B4FDD1";
      case "_purple":
        return "#E9D4FF";
      case "_default":
      default:
        return "#FFF";
    }
  }};
  color: ${({ themeType }) => {
    switch (themeType) {
      case "_orange":
        return "#FF6D00";
      case "_green":
        return "#06B16E";
      case "_purple":
        return "#9A48F1";
      case "_default":
      default:
        return "#000";
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
    background-color: #94A6BE;
    transition: background-color 0.3s;
  }

  &:hover div {
    background-color: #3f53d8;
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
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000000")};
  margin-bottom: 10px;
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
    height: 13px;
    fill: none; /* Прозрачный фон */
    stroke: #6a6b6cff; /* Контур календарика */
    stroke-width: 0.8;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94A6BE;
    letter-spacing: 0.2px;
  }
`;