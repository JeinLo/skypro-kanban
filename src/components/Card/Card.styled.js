import styled from "styled-components";

export const CardItem = styled.div`
  padding: 5px;
  animation: cardAnimation 500ms linear;
`;

export const CardStyled = styled.div`
  width: 220px;
  height: 130px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;

  @media screen and (max-width: 1200px) {
    width: 220px;
    height: 130px;
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
      case "_purple": // Copywriting
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
      case "_purple": // Copywriting
        return "#9A48F1";
      case "_default":
      default:
        return "#000";
    }
  }};

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
  }
`;

export const CardButton = styled.a`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
  text-decoration: none;

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94A6BE;
  }
`;

export const CardContent = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    width: 13px;
    height: 13px;
    fill: #94A6BE;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94A6BE;
    letter-spacing: 0.2px;
  }
`;

export const cardAnimation = `
  @keyframes cardAnimation {
    0% { height: 0; opacity: 0; }
    100% { height: auto; opacity: 1; }
  }
`;
